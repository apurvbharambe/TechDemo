import yfinance as yf
from django.core.management.base import BaseCommand
from myapp.models import Stock
from datetime import datetime

class Command(BaseCommand):
    help = 'Fetch daily stock data for a list of tickers and store it in the database.'

    def handle(self, *args, **kwargs):
        tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'BRK-B', 'JPM', 'UNH',
                   'V', 'MA', 'HD', 'DIS', 'NFLX', 'INTC', 'CSCO', 'CMCSA', 'PEP', 'KO',
                   'ADBE', 'PFE', 'MRK', 'NKE', 'T', 'WMT', 'BA', 'IBM', 'XOM', 'CVX']  # Add your 50 stock tickers here

        for ticker in tickers:
            self.fetch_and_store_data(ticker)
    
    def fetch_and_store_data(self, ticker):
        # Fetch data from yfinance for the most recent day
        data = yf.download(ticker, period='1d', interval='1d')

        if data.empty:
            self.stdout.write(self.style.WARNING(f"No data found for {ticker}"))
            return

        # Store the most recent day's data in the database
        for date, row in data.iterrows():
            Stock.objects.update_or_create(
                ticker=ticker,
                date=date.date(),
                defaults={
                    'open': row['Open'],
                    'high': row['High'],
                    'low': row['Low'],
                    'close': row['Close'],
                    'volume': row['Volume'],
                }
            )
            self.stdout.write(self.style.SUCCESS(f"Data for {ticker} on {date.date()} stored successfully"))
