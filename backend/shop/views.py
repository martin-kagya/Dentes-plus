from rest_framework import status,generics,mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Shop
from .serializers import ShopSerializer

# Create your views here.

# a class to get or post the list of shops
class ShopList(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

# a concrete class to get, update or delete a shop
class ShopDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer