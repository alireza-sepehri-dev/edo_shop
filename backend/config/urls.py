"""
URL configuration for config project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import ( 
    TokenObtainPairView, 
    TokenRefreshView, 
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cart/', include('cart.urls')), 
    path('lessons/', include('lessons.urls')), 
    path('orders/', include('orders.urls')), 
    path('users/', include('users.urls')), 
]

urlpatterns += [
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"), 
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]