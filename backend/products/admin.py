from django.contrib import admin

from products.models import Product, ProductCategory


@admin.register(ProductCategory)
class ModelNameAdmin(admin.ModelAdmin):
    ordering = ('title',)


@admin.register(Product)
class ModelNameAdmin(admin.ModelAdmin):
    ordering = ('name',)
