from django.db import models
from dentist.models import Dentist
from patient.models import Patient
# Create your models here.

class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    dentist_id = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    accepted_appointment = models.BooleanField(default=False)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self) -> str:
        return self.patient_id.name + " - " + self.dentist_id.name