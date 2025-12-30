from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EmailVerificationCode, Profile


class EmailVerificationCodeSerializer(serializers.ModelSerializer):
    is_expired = serializers.SerializerMethodField() 
    can_resend = serializers.SerializerMethodField() 
    
    class Meta:
        model = EmailVerificationCode 
        fields = [ 'id', 'email', 'code', 'created_at', 'used', 'is_expired', 'can_resend', ] 
        read_only_fields = ['created_at', 'is_expired', 'can_resend'] 
        
        def get_is_expired(self, obj): 
            return obj.is_expired() 
        
        def get_can_resend(self, obj): 
            return obj.can_resend()