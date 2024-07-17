from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import *

urlpatterns = [
    path('register/', registration_view.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    # path('token/', ObtainTokenView.as_view(), name='token'),
    path('refresh/', login.as_view(), name='refresh'),
    path('logout/', logout_view.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('logina/',UserLogin.as_view(),name='logina'),
    path('registera/',UserRegister.as_view(),name='registera'),
    path('logouta/',UserLogout.as_view(),name='logouta'),
    path('test/<str:email>/',Test.as_view(),name='test'),
]