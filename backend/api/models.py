from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length = 100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    is_dentist = models.BooleanField(default=False)
    #is_patient = models = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# class Dentist(models.Model):
#     dentist_id = models.AutoField(primary_key=True)
#     user_id=models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     specialization =models.CharField(max_length=100)

#     def __str__(self):
#         return self.name
    
# class Patient(models.Model):
#     patient_id = models.AutoField(primary_key=True)
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     phone_number = models.CharField( max_length=10, unique=True)
#     email= models.EmailField(max_length = 100)
#     address = models.CharField(max_length = 100)
#     birth_date = models.DateField()
#     occupation =models.CharField(max_length=100)
#     conditon = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


# class Appointment(models.Model):
#     appointment_id = models.AutoField(primary_key=True)
#     dentist_id = models.ForeignKey(Dentist, on_delete=models.CASCADE)
#     patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
#     accepted_appointment = models.BooleanField(default=False)
#     date = models.DateField()
#     time = models.TimeField()

#     def __str__(self) -> str:
#         return self.patient_id.name + " - " + self.dentist_id.name
    

class ShopInventory(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length =100)
    price = models.FloatField()
    item_type = models.CharField(max_length=100)
    quantity = models.IntegerField()
