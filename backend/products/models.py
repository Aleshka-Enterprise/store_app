from django.db import models


class ProductCategory(models.Model):
    title = models.CharField(max_length=128, verbose_name='Наименование')
    description = models.TextField(verbose_name='Описание', null=True, blank=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    name = models.CharField(max_length=256, verbose_name='Название')
    category = models.ForeignKey(to=ProductCategory, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Цена')
    description = models.TextField(verbose_name='Описание')
    short_description = models.CharField(max_length=128, verbose_name='Краткое описание')
    image = models.ImageField(upload_to='products_images')

    def __str__(self):
        return self.name


