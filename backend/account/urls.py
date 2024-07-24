from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token


# urls for account app
urlpatterns = [
    path('signup/', signup.as_view(), name='signup'),
    path('login/', login.as_view(), name='login'),
    path('logout/', logout, name='logout'),
    path('user-list/', UserList.as_view(), name='user-list'),
    path('user-detail/<int:pk>/', UserDetail.as_view(), name='user-detail'),
]
