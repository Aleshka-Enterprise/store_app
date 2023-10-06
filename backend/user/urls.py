from django.urls import path
from rest_framework.authtoken import views

from user.views import CurrentUserView, Logout

urlpatterns = [
    path('autorization/', views.obtain_auth_token),
    path('get_current_user/', CurrentUserView.as_view(), name='get_user_by_token'),
    path('logout/', Logout.as_view(), name='logout'),
]
