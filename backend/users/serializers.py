import re
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EmailVerificationCode, Profile
from django.contrib.auth import authenticate


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
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-])[A-Za-z\d!@#$%^&*()_+=-]{8,}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError(
                'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک، عدد و کاراکترهای خاص باشد.'
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
    


class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField(
        error_messages={'required': 'نام کاربری(ایمیل) را وارد کنید'}
    )
    password = serializers.CharField(
        write_only=True,
        error_messages={'required': 'رمز عبور را وارد کنید'}
    )

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("نام کاربری یا رمز عبور اشتباه است.")
        if not user.is_active:
            raise serializers.ValidationError("حساب کاربری شما غیرفعال است.")
        data['user'] = user
        return data
    

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True) 
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", required=False, allow_blank=True, max_length=15)
    last_name = serializers.CharField(source="user.last_name", required=False, allow_blank=True, max_length=15)
    date_joined = serializers.DateTimeField(source="user.date_joined", read_only=True)
    last_login = serializers.DateTimeField(source="user.last_login", read_only=True)

    class Meta:
        model = Profile
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "city",
            "bio",
            "avatar",
            "birth_date",
            "school_name",
            "education_status",
            "major",
            "grade",
            "date_joined",
            "last_login",
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        user = instance.user
        user.first_name = user_data.get("first_name", user.first_name)
        user.last_name = user_data.get("last_name", user.last_name)
        user.save()
        return super().update(instance, validated_data)