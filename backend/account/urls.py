from django.urls import path, include
from .views import *

urlpatterns = [
    path('signup/', signup.as_view(), name='signup'),
    path('login/', login.as_view(), name='login'),
    path('logout/', logout, name='logout'),
    # path('test-view/',test.as_view(), name='test'),
]
