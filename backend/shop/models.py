from django.db import models

# Create your models here.

class Shop(models.Model):
    shop_id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.item_name