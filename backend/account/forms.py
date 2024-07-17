from django.contrib.auth.forms import AuthenticationForm
from .models import Account
class LoginForm(AuthenticationForm):
    class Meta:
        model = Account
        fields = ['username', 'password']