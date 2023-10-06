from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class CurrentUserView(APIView):
    """Получить текущего пользователя"""

    def get(self, request):
        if request.user:
            user = request.user
            data = {
                'id': user.id,
                'email': user.email,
                'firstName': user.first_name,
                'lastName': user.last_name,
                'username': user.username,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(data={'message': 'Ползьователь не найден!'}, status=404)


class Logout(APIView):

    def get(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
