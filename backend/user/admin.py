from django.contrib import admin

from user.models import User, EmailVerification


@admin.register(User)
class ModelNameAdmin(admin.ModelAdmin):
    ordering = ('username',)


@admin.register(EmailVerification)
class ModelNameAdmin(admin.ModelAdmin):
    ordering = ('created',)
    filter = ('uuid',)
