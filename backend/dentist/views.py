from rest_framework import status,generics,mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Dentist
from .serializers import DentistSerializer

# Create your views here.

# a class to get or post the list of dentists
# class DentistList(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
#     queryset = Dentist.objects.all()
#     serializer_class = DentistSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
    
# class DentistDetail(mixins.RetrieveModelMixin,generics.GenericAPIView):
#     queryset = Dentist.objects.all()
#     serializer_class = DentistSerializer

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)


# a concrete class to get or post the list of dentists
class DentistList(generics.ListCreateAPIView):
    queryset = Dentist.objects.all()
    serializer_class = DentistSerializer

# a concrete class to get, update or delete a dentist
class DentistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dentist.objects.all()
    serializer_class = DentistSerializer