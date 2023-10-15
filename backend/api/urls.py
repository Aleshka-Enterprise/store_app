from django.urls import include, path

from drf_spectacular.views import SpectacularRedocView, SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('product/', include('products.urls')),
    path('user/', include('user.urls')),
    path('basket/', include('basket.urls')),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path("schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui")
]
