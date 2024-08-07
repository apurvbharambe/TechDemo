from django.urls import path
from .views import RegisterView, LoginView, CsrfTokenView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('csrf-token/', CsrfTokenView.as_view(), name='csrf_token'),
]
