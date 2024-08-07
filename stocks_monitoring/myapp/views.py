import logging
from datetime import timedelta

import pandas as pd
from django.http import HttpResponse
from django.utils.timezone import now
from prometheus_client import Gauge, generate_latest, CollectorRegistry
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Stock
from .serializers import KpiSerializer, GainerLoserSerializer

# Create a registry and gauges
registry = CollectorRegistry()
price_change_24h_gauge = Gauge('price_change_24h', '24h Price Change', ['ticker'], registry=registry)

logger = logging.getLogger(__name__)

def update_metrics():
    """Updates the Prometheus metrics"""
    stock_data = pd.DataFrame(list(Stock.objects.all().values()))
    stock_data['date'] = pd.to_datetime(stock_data['date']).dt.date

    if stock_data.empty:
        return

    end_date = stock_data['date'].max()

    tickers = stock_data['ticker'].unique()
    logger.debug(f"Updating metrics for tickers: {tickers}")

    for ticker in tickers:
        ticker_data = stock_data[stock_data['ticker'] == ticker]
        ticker_data = ticker_data.sort_values('date')

        if ticker_data.empty:
            continue

        price_change_24h = get_price_change_percentage(ticker_data, 1, end_date)
        logger.debug(f"Ticker: {ticker}, 24h Price Change: {price_change_24h}")
        price_change_24h_gauge.labels(ticker=ticker).set(price_change_24h if price_change_24h is not None else 0)

def get_price_change_percentage(ticker_data, period, end_date):
    start_date = end_date - timedelta(days=period)
    start_price_data = ticker_data[ticker_data['date'] <= start_date]
    end_price_data = ticker_data[ticker_data['date'] <= end_date]

    if not start_price_data.empty and not end_price_data.empty:
        start_price = start_price_data.iloc[-1]['close']
        end_price = end_price_data.iloc[-1]['close']
        return ((end_price - start_price) / start_price) * 100
    return None

class KpiViewSet(viewsets.ViewSet):
    def list(self, request):
        update_metrics()  # Update metrics before serving data

        stock_data = pd.DataFrame(list(Stock.objects.all().values()))
        stock_data['date'] = pd.to_datetime(stock_data['date']).dt.date

        if stock_data.empty:
            return Response({"data": {"all_data": [], 'gainers': [], 'losers': []}})

        end_date = stock_data['date'].max()

        tickers = stock_data['ticker'].unique()
        kpi_data = []

        for ticker in tickers:
            ticker_data = stock_data[stock_data['ticker'] == ticker]
            ticker_data = ticker_data.sort_values('date')

            if ticker_data.empty:
                continue

            daily_closing_price = ticker_data[ticker_data['date'] <= end_date].iloc[-1]
            price_change_24h = get_price_change_percentage(ticker_data, 1, end_date)
            price_change_30d = get_price_change_percentage(ticker_data, 30, end_date)
            price_change_1y = get_price_change_percentage(ticker_data, 365, end_date)

            kpi_data.append({
                'ticker': daily_closing_price["ticker"],
                'daily_closing_price': daily_closing_price["close"],
                'date': daily_closing_price["date"],
                'high': daily_closing_price["high"],
                'low': daily_closing_price["low"],
                'open': daily_closing_price["open"],
                'volume': daily_closing_price["volume"],
                'price_change_24h': price_change_24h,
                'price_change_30d': price_change_30d,
                'price_change_1y': price_change_1y,
            })

        start_date = end_date - timedelta(days=1)
        recent_data = stock_data[(stock_data['date'] > start_date) & (stock_data['date'] <= end_date)].copy()
        if recent_data.empty:
            return Response({"data": {"all_data": [], 'gainers': [], 'losers': []}})

        recent_data.loc[:, 'price_change_percentage'] = ((recent_data['close'] - recent_data['open']) / recent_data['open']) * 100

        gainers = recent_data.sort_values('price_change_percentage', ascending=False).head(5)
        losers = recent_data.sort_values('price_change_percentage', ascending=True).head(5)

        gainers_serializer = GainerLoserSerializer(gainers.to_dict('records'), many=True)
        losers_serializer = GainerLoserSerializer(losers.to_dict('records'), many=True)

        serializer = KpiSerializer(kpi_data, many=True)
        return Response({"data": {"all_data": serializer.data, 'gainers': gainers_serializer.data, 'losers': losers_serializer.data}})

class GainerLoserViewSet(viewsets.ViewSet):
    def list(self, request):
        stock_data = pd.DataFrame(list(Stock.objects.all().values()))
        stock_data['date'] = pd.to_datetime(stock_data['date']).dt.date

        if stock_data.empty:
            return Response({'gainers': [], 'losers': []})

        end_date = stock_data['date'].max()
        start_date = end_date - timedelta(days=1)

        recent_data = stock_data[(stock_data['date'] > start_date) & (stock_data['date'] <= end_date)].copy()
        if recent_data.empty:
            return Response({'gainers': [], 'losers': []})

        recent_data.loc[:, 'price_change_percentage'] = ((recent_data['close'] - recent_data['open']) / recent_data['open']) * 100

        gainers = recent_data.sort_values('price_change_percentage', ascending=False).head(5)
        losers = recent_data.sort_values('price_change_percentage', ascending=True).head(5)

        gainers_serializer = GainerLoserSerializer(gainers.to_dict('records'), many=True)
        losers_serializer = GainerLoserSerializer(losers.to_dict('records'), many=True)

        return Response({'gainers': gainers_serializer.data, 'losers': losers_serializer.data})

@api_view(['GET'])
def prometheus_metrics(request):
    update_metrics()  # Ensure metrics are updated before serving
    metrics_data = generate_latest(registry)
    return HttpResponse(metrics_data, content_type='text/plain')






















