
from django.urls import path
from .views import *

urlpatterns = [
    path('review/', DentistList.as_view(), name='dentist_list'),
    path('review/<int:pk>/', DentistDetail.as_view(), name='dentist_detail'),
]
