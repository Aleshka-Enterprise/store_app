from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from user.views import EmailVerificationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('email_verification/<int:user_id>/<uuid:uuid>/', EmailVerificationView.as_view(), name='email_verification'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
