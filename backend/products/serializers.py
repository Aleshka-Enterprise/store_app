from rest_framework import serializers
from products.models import ProductCategory, Product


class ProductsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ('id', 'title', 'description')


class ProductsSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='title', queryset=ProductCategory.objects.all())

    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'quantity', 'price', 'description', 'short_description', 'image')
