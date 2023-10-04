from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from products.models import ProductCategory, Product
from products.serializers import ProductsCategorySerializer, ProductsSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3


class ProductsCategoryAPIView(ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductsCategorySerializer


class ProductModelViewSet(ModelViewSet):
    serializer_class = ProductsSerializer
    pagination_class = StandardResultsSetPagination
    queryset = Product.objects.filter()

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        return Product.objects.filter(category_id=category_id) if category_id else Product.objects.all()

    # def permission_denied(self, request, message=None, code=None):
