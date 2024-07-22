from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token


# urls for account app
urlpatterns = [
    path('signup/', signup.as_view(), name='signup'),
    path('login/', login.as_view(), name='login'),
    path('logout/', logout, name='logout'),
    # path('test/',obtain_auth_token, name='test'),
    # path('test-view/',test.as_view(), name='test'),
]
