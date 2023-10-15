from datetime import timedelta
from uuid import uuid4

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.urls import reverse
from django.utils.timezone import now


class User(AbstractUser):
    image = models.ImageField(upload_to='users_images', blank=True, null=True)
    email_is_certificated = models.BooleanField(default=False, verbose_name='Почта подтверждена')

    def __str__(self):
        return self.username


class EmailVerification(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    uuid = models.UUIDField(unique=True)
    expiration_date = models.DateTimeField(verbose_name='Срок годности')

    def send_mail(self):
        link = reverse('email_verification', kwargs={'user_id': self.user.id, 'uuid': self.uuid})
        message = f'''Для подтверждения учётной записи для {self.user.username} перейдите по ссылке:
        {settings.DOMAIN_NAME}{link}
        '''

        send_mail(
            subject=f'Подтверждение учётной записи для {self.user.username}',
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[self.user.email],
            fail_silently=False
        )

    @classmethod
    def create_email_verification(cls, user_id):
        email_verification = cls.objects.create(created=now(), user_id=user_id, uuid=uuid4(),
                                                expiration_date=now() + timedelta(days=2))
        email_verification.send_mail()
        cls.send_mail(email_verification)
        email_verification.save()

    def __str__(self):
        return f'{self.user.username} | {self.uuid}'
