from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import EmailVerificationCode
from rest_framework import status
from .services import create_verification_code, send_verification_email

class RequestVerificationCodeView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "ایمیل الزامی است"}, status=status.HTTP_400_BAD_REQUEST)
        
        # بررسی وجود کاربر با این ایمیل
        if User.objects.filter(email=email).exists():
            return Response({'error': 'این ایمیل قبلاً ثبت‌نام کرده است.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # بررسی وجود کد فعال
        existing = EmailVerificationCode.objects.filter(email=email).order_by('-created_at').first()
        if existing and not existing.can_resend():
            return Response({'error': 'لطفاً چند دقیقه دیگر تلاش کنید.'},
                            status=status.HTTP_429_TOO_MANY_REQUESTS)

        verification = create_verification_code(email)
        send_verification_email(email, verification.code)

        return Response({'message': 'کد تایید به ایمیل شما ارسال شد'}, status=status.HTTP_200_OK)