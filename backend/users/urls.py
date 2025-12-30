from django.urls import path
from .views import RequestVerificationCodeView

urlpatterns = [
    path('request-verification-code/', RequestVerificationCodeView.as_view(), name='request_verification_code'),
]