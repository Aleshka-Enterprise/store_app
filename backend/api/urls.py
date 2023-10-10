from django.urls import path, include

urlpatterns = [
    path('product/', include('products.urls')),
    path('user/', include('user.urls')),
    path('basket/', include('basket.urls'))
]

