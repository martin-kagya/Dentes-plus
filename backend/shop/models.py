from django.db import models

# Create your models here.

class ShopInventory(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length =100)
    price = models.FloatField()
    item_type = models.CharField(max_length=100)
    quantity = models.IntegerField()