from django.urls import path
from rest_framework.authtoken import views

from user.views import CreateUserView, CurrentUserView, Logout, UserApiView

urlpatterns = [
    path('autorization/', views.obtain_auth_token),
    path('get_current_user/', CurrentUserView.as_view(), name='get_user_by_token'),
    path('logout/', Logout.as_view(), name='logout'),
    path('registration/', CreateUserView.as_view(), name='registration'),
    path('<pk>/', UserApiView.as_view(), name='user')
]
