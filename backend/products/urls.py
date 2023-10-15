from django.urls import include, path
from rest_framework import routers

from products.views import ProductModelViewSet, ProductsCategoryAPIView

products = routers.DefaultRouter()
products.register(r'products-list', ProductModelViewSet, 'products-list')

urlpatterns = [
    path('categories/', ProductsCategoryAPIView.as_view(), name='categories'),
    path('', include(products.urls), name='products')
]
