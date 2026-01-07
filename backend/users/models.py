from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
from django.utils import timezone
from django.core.validators import RegexValidator

class EmailVerificationCode(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=3)

    def can_resend(self):
        return timezone.now() > self.created_at + timedelta(minutes=2) 
    class Meta:
        indexes = [models.Index(fields=['email'])]



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(
        max_length=11,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
            )
        ])
    city = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    school_name = models.CharField(max_length=100, blank=True)
    education_status = models.CharField(max_length=100, blank=True) # وضعیت تحصیلی
    major = models.CharField(max_length=100, blank=True) # رشته تحصیلی 
    grade = models.CharField(max_length=50, blank=True) # پایه تحصیلی

    def __str__(self):
            return f"{self.user.username} Profile"