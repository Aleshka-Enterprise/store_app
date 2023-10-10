from django.urls import path, include
from rest_framework import routers

from basket.views import BasketModelViewSet, UserBasketAPIView, AddBasketAPIView

basket = routers.DefaultRouter()
basket.register(r'', BasketModelViewSet, 'basket')


urlpatterns = [
    path('', include(basket.urls)),
    path('add/<product_id>', AddBasketAPIView.as_view()),
    path('', UserBasketAPIView.as_view()),
]