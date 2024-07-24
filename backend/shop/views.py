from rest_framework import status,generics,mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Shop
from .serializers import ShopSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated 

# Create your views here.

# a class to get or post the list of shops
class ShopList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

# a concrete class to get, update or delete a shop
class ShopDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer