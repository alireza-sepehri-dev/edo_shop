"""
URL configuration for config project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cart/', include('cart.urls')), 
    path('lessons/', include('lessons.urls')), 
    path('orders/', include('orders.urls')), 
    path('users/', include('users.urls')), 
]