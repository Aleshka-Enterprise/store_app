from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions

from user.peremissions import IsAuthorOrAdmin
from user.serializers import CreateUserSerializer, UserSerialization


class CurrentUserView(APIView):
    serializer_class = UserSerialization
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
    serializer_class = UserSerialization
    permission_classes = [IsAuthorOrAdmin]

    def get_queryset(self):
        return User.objects.filter(id=self.kwargs.get('pk'))
