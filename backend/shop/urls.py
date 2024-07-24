from django.urls import path
from .views import ShopList, ShopDetail

urlpatterns = [
    path('list/', ShopList.as_view(), name='shop-list'),
    path('detail/<int:pk>/', ShopDetail.as_view(), name='shop-detail'),
]
