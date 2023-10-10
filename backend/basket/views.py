from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from basket.serializers import BasketsSerializer
from basket.models import Basket
from user.peremissions import IsAuthorOrAdmin


class BasketModelViewSet(ModelViewSet):
    serializer_class = BasketsSerializer

    def get_queryset(self):
        return Basket.objects.filter(user=self.request.user)

    def permission_denied(self, request, message=None, code=None):
        if self.action in ['create', 'update', 'destroy']:
            self.pagination_class = [IsAuthenticated]
        return super(BasketModelViewSet, self).get_permissions()


class AddBasketAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        basket = Basket.objects.filter(user=request.user, product__id=kwargs.get('product_id'))
        if basket.exists():
            basket = basket.first()
            basket.quantity += 1
            basket.save()
        else:
            Basket(user=request.user, product_id=kwargs.get('product_id'), quantity=1).save()
        return Response(status=status.HTTP_201_CREATED)


class BasketApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = BasketsSerializer
    permission_classes = [IsAuthorOrAdmin]

    def get_queryset(self):
        return Basket.objects.filter(id=self.kwargs.get('pk'))


class UserBasketAPIView(ListAPIView):
    serializer_class = BasketsSerializer
    permission_classes = [IsAuthorOrAdmin, IsAuthenticated]

    def get_queryset(self):
        return Basket.objects.filter(user_id=self.request.user.id)

