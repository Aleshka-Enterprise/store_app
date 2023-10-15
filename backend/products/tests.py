from django.shortcuts import reverse
from django.test import TestCase
from rest_framework import status

from products.models import ProductCategory


class ProductsTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        ProductCategory(title='test').save()

    def test_categories(self):
        response = self.client.get(reverse('categories'))
        self.assertEquals(response.status_code, status.HTTP_200_OK)
