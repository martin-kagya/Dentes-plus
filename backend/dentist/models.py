from django.db import models
# from django.contrib.auth.models import User


# dentist model
class Dentist(models.Model):
    SPECIALIZATION = (
        ('restorative', 'Restorative'),
        ('cosmetic', 'Cosmetic'),
    )
    dentist_id = models.AutoField(primary_key=True)
    # user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    specialization =models.CharField(max_length=100,choices=SPECIALIZATION)

    def __str__(self):
        return self.name