# Generated by Django 5.0.7 on 2024-07-27 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appoint', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.TimeField(auto_now=True),
        ),
    ]