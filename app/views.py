from django.shortcuts import render
from django.contrib.auth.models import User

# Create your views here.

def home(request):
    users_values = User.objects.values()
    users = User.objects.all()
    print(users_values)
    print("#######################################")
    print(users)
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')