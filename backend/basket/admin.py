from django.contrib import admin
from basket.models import Basket


@admin.register(Basket)
class ModelNameAdmin(admin.ModelAdmin):
    ordering = ('user',)
