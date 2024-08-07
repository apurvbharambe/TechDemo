from rest_framework import serializers
from .models import Stock
import pandas as pd
from datetime import datetime

class KpiSerializer(serializers.Serializer):
    ticker = serializers.CharField()
    date = serializers.SerializerMethodField()
    open = serializers.FloatField()
    high = serializers.FloatField()
    low = serializers.FloatField()
    volume = serializers.FloatField()
    daily_closing_price = serializers.FloatField(allow_null=True)
    price_change_24h = serializers.FloatField(allow_null=True)
    price_change_30d = serializers.FloatField(allow_null=True)
    price_change_1y = serializers.FloatField(allow_null=True)

    def get_date(self, obj):
        date = obj.get('date') if isinstance(obj, dict) else getattr(obj, 'date', None)
        if isinstance(date, (pd.Timestamp, datetime)):
            return date.date()
        return date

class GainerLoserSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    price_change_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Stock
        fields = ['ticker', 'date', 'open', 'close', 'price_change_percentage']

    def get_date(self, obj):
        date = obj.get('date') if isinstance(obj, dict) else getattr(obj, 'date', None)
        if isinstance(date, (pd.Timestamp, datetime)):
            return date.date()
        return date

    def get_price_change_percentage(self, obj):
        open_price = obj.get('open') if isinstance(obj, dict) else getattr(obj, 'open', None)
        close_price = obj.get('close') if isinstance(obj, dict) else getattr(obj, 'close', None)

        if open_price and open_price != 0:
            return ((close_price - open_price) / open_price) * 100
        return None

class KpiSerializertest(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"



