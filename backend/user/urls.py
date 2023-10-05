from django.urls import path
from rest_framework.authtoken import views

urlpatterns = [
    path('autorization/', views.obtain_auth_token)
]
