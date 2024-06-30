# Generated by Django 5.0.6 on 2024-06-30 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ShopInventory',
            fields=[
                ('item_id', models.AutoField(primary_key=True, serialize=False)),
                ('item_name', models.CharField(max_length=100)),
                ('price', models.FloatField()),
                ('item_type', models.CharField(max_length=100)),
                ('quantity', models.IntegerField()),
            ],
        ),
    ]
