from django.db import models

from products.models import Product
from user.models import User


class Basket(models.Model):
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE, verbose_name='Продукт')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='Пользователь')
    date = models.DateField(auto_now_add=True, verbose_name='Дата')
    quantity = models.PositiveIntegerField(verbose_name='Количество')

    def __str__(self):
        return f'Корзина пользователя {self.user.username}'
