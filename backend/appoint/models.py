from django.db import models

# Create your models here.

class Appointment(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    email = models.EmailField()
    date = models.DateField()
    reason = models.TextField()
    accepted_appointment = models.BooleanField(default=False)

    def __str__(self):
        return self.email