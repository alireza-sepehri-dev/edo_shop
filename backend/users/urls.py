from django.urls import path
from .views import (
    RequestVerificationCodeView,
    RegisterUserView, 
    LoginView,
)

urlpatterns = [
    path('request-verification-code/', RequestVerificationCodeView.as_view(), name='request_verification_code'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]