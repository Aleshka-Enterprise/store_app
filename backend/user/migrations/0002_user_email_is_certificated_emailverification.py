# Generated by Django 4.2.5 on 2023-10-15 11:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email_is_certificated',
            field=models.BooleanField(default=False, verbose_name='Почта подтверждена'),
        ),
        migrations.CreateModel(
            name='EmailVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('uuid', models.UUIDField(unique=True)),
                ('expiration_date', models.DateTimeField(verbose_name='Срок годности')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
