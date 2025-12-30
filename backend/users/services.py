import random
from django.core.mail import send_mail
from django.conf import settings
from .models import EmailVerificationCode

# ایجاد کد ۶ رقمی تاییدیه برای ارسال و تایید ایمیل
def create_verification_code(email):
    code = str(random.randint(100000, 999999))  # کد ۶ رقمی
    verification = EmailVerificationCode.objects.create(email=email, code=code)
    return verification


def send_verification_email(email, code):
    subject = "کد تأیید ثبت نام در coffeemath"
    message = f"کد تأیید شما: {code}"
    send_mail(subject, message, settings.EMAIL_HOST_USER, [email])