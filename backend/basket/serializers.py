from rest_framework import serializers

from basket.models import Basket
from products.serializers import ProductsSerializer
from user.serializers import UserSerializer


class BasketsSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Basket(**validated_data)

    product = ProductsSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Basket
        fields = ('id', 'product', 'user', 'quantity')
