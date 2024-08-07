from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KpiViewSet, GainerLoserViewSet, prometheus_metrics  # Added necessary imports

router = DefaultRouter()
router.register(r'kpis', KpiViewSet, basename='kpi')
#router.register(r'gainers-losers', GainerLoserViewSet, basename='gainer-loser')  # Uncommented and included

urlpatterns = [
    path('', include(router.urls)),
    path('metrics/', prometheus_metrics, name='prometheus-metrics'),  # Added Prometheus metrics endpoint
]





# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import KpiViewSet, GainerLoserViewSet, prometheus_metrics  # Added necessary imports

# router = DefaultRouter()
# router.register(r'kpis', KpiViewSet, basename='kpi')
# #router.register(r'gainers-losers', GainerLoserViewSet, basename='gainer-loser')  # Uncommented and included

# urlpatterns = [
#     path('', include(router.urls)),
#     path('metrics/', prometheus_metrics, name='prometheus-metrics'),  # Added Prometheus metrics endpoint
# ]












# from myapp import views
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import KpiViewSet

# router = DefaultRouter()
# router.register(r'kpis', KpiViewSet, basename='kpi')
# # router.register(r'gainers-losers', GainerLoserViewSet, basename='gainer-loser')

# urlpatterns = [
#     path('', include(router.urls)),
 
    
# ]


