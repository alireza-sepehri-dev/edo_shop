from django.urls import path
from .views import RequestVerificationCodeView, RegisterUserView

urlpatterns = [
    path('request-verification-code/', RequestVerificationCodeView.as_view(), name='request_verification_code'),
    path('register/', RegisterUserView.as_view(), name='register'),
]