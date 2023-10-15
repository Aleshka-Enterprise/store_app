from django.urls import include, path
from rest_framework import routers

from basket.views import (AddBasketAPIView, BasketModelViewSet,
                          UserBasketAPIView)

basket = routers.DefaultRouter()
basket.register(r'', BasketModelViewSet, 'basket')


urlpatterns = [
    path('', include(basket.urls)),
    path('add/<product_id>', AddBasketAPIView.as_view()),
    path('', UserBasketAPIView.as_view()),
]
