from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import status
from .models import EmailVerificationCode
from .serializers import RegisterSerializer
from .services import create_verification_code, send_verification_email

class RequestVerificationCodeView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "لطفا ایمیل خود را وارد کنید"}, status=status.HTTP_400_BAD_REQUEST)
        
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

        return Response({'message': 'کد تأیید به ایمیل شما ارسال شد ✅'}, status=status.HTTP_200_OK)
    


class RegisterUserView(APIView):
    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("code")

        if not code:
            return Response({"error": "لطفا کد تایید را وارد کنید."}, status=status.HTTP_400_BAD_REQUEST)
    
        # بررسی وجود کد تأیید
        verification = EmailVerificationCode.objects.filter(email=email).order_by('-created_at').first()
        if not verification or verification.code != code:
            return Response({"error": "کد تأیید وارد شده معتبر نیست."}, status=status.HTTP_400_BAD_REQUEST)
        
        # بررسی انقضا 
        if verification.is_expired(): 
            return Response({"error": "کد تأیید منقضی شده است. لطفاً دوباره تلاش کنید."}, status=status.HTTP_400_BAD_REQUEST)

        # بررسی عدم وجود کاربر با این ایمیل
        if User.objects.filter(email=email).exists():
            return Response({"error": "کاربری با این ایمیل قبلاً ثبت‌نام کرده است."}, status=status.HTTP_400_BAD_REQUEST)
        
        # استفاده از سریالایزر برای اعتبارسنجی رمز عبور و ساخت کاربر 
        serializer = RegisterSerializer(data=request.data, context={"email": email}) 
        serializer.is_valid(raise_exception=True)

        # ایجاد کاربر و حذف رکورد کد تأیید در یک تراکنش
        with transaction.atomic(): 
            serializer.save() 
            verification.delete()

        return Response({"message": "ثبت‌نام با موفقیت انجام شد ✅"}, status=status.HTTP_201_CREATED)