from django.db import models
from api.models import User
# Create your models here.

class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone_number = models.CharField( max_length=10, unique=True)
    email= models.EmailField(max_length = 100)
    address = models.CharField(max_length = 100)
    birth_date = models.DateField()
    occupation =models.CharField(max_length=100)
    conditon = models.CharField(max_length=100)

    def __str__(self):
        return self.name