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