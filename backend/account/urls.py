from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import *

urlpatterns = [
    path('register/', registration_view.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('token/', ObtainTokenView.as_view(), name='token'),
    path('refresh/', obtain_auth_token, name='refresh'),
    path('logout/', logout_view.as_view(), name='logout')
]