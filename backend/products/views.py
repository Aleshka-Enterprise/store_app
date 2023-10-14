from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.viewsets import ModelViewSet

from products.models import ProductCategory, Product
from products.serializers import ProductsCategorySerializer, ProductsSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3


class ProductsCategoryAPIView(ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductsCategorySerializer
    permission_classes = [AllowAny]


class ProductModelViewSet(ModelViewSet):
    serializer_class = ProductsSerializer
    pagination_class = StandardResultsSetPagination
    queryset = Product.objects.filter()

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        return Product.objects.filter(category_id=category_id) if category_id else Product.objects.all()

    def permission_denied(self, request, message=None, code=None):
        if self.action in ['create', 'update', 'destroy']:
            self.pagination_class = [IsAdminUser]
        return super(ProductModelViewSet, self).get_permissions()
