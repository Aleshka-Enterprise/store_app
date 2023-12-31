from django.views.generic.base import TemplateView

from rest_framework import permissions, status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import User, EmailVerification
from user.peremissions import IsAuthorOrAdmin
from user.serializers import CreateUserSerializer, UserSerializer


class CurrentUserView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        if request.user:
            user = request.user
            data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'username': user.username,
                'image': user.image.url,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(data={'message': 'Ползьователь не найден!'}, status=status.HTTP_404_NOT_FOUND)


class Logout(APIView):

    def get(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class CreateUserView(CreateAPIView):
    model = User()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CreateUserSerializer


class UserApiView(RetrieveUpdateDestroyAPIView):
    model = User()
    serializer_class = UserSerializer
    permission_classes = [IsAuthorOrAdmin]

    def get_queryset(self):
        return User.objects.filter(id=self.kwargs.get('pk'))


class EmailVerificationView(TemplateView):
    template_name = 'user/email_verification.html'

    def get(self, request, *args, **kwargs):
        res = super().get(EmailVerificationView, self)
        email_verification = EmailVerification.objects.filter(uuid=kwargs.get('uuid'))
        if email_verification.exists():
            email_verification = email_verification.first()
            user = email_verification.user
            user.is_verified = True
            user.save()

        return res

    def get_context_data(self, **kwargs):
        email_verification = EmailVerification.objects.filter(uuid=self.kwargs.get('uuid'))
        if email_verification.exists():
            return {
                'title': 'Поздравляем',
                'message': 'Ваша учетная запись успешно подтверждена!',
            }
        else:
            return {
                'title': 'Что-то пошло не так!',
                'message': 'Пользователь не найден',
            }


