from rest_framework import routers

from products.views import ProductsCategoryAPIView, ProductModelViewSet
from django.urls import path, include

products = routers.DefaultRouter()
products.register(r'products-list', ProductModelViewSet, 'products-list')

urlpatterns = [
    path('categorys/', ProductsCategoryAPIView.as_view()),
    path('', include(products.urls))
]
