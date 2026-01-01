import re
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EmailVerificationCode


class EmailVerificationCodeSerializer(serializers.ModelSerializer):
    is_expired = serializers.SerializerMethodField() 
    can_resend = serializers.SerializerMethodField() 
    
    class Meta:
        model = EmailVerificationCode 
        fields = [ 'id', 'email', 'code', 'created_at', 'is_expired', 'can_resend', ] 
        read_only_fields = ['created_at', 'is_expired', 'can_resend'] 
        
    def get_is_expired(self, obj): 
        return obj.is_expired() 
    
    def get_can_resend(self, obj): 
        return obj.can_resend()
        

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={
            'required': 'رمز عبور را وارد کنید',
            'blank': 'رمز عبور نمی تواند خالی باشد'
        }
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={
            'required': 'تکرار رمز عبور را وارد کنید',
            'blank': 'تکرار رمز عبور و رمز عبور یکسان نیستند'
        }
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm'] 
        read_only_fields = ['username', 'email']


    def validate_password(self, value):
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError(
                'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد.'
            )
        return value

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'رمز عبور و تکرار آن یکسان نیست.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        email = self.context.get('email')
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data['password'],
        )
        return user