from django.urls import path
from .views import RegisterView, ObtainTokenView, LoginView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', ObtainTokenView.as_view(), name='token'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')
]