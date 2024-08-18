from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.authentication import SessionAuthentication
from .serializers import UserSerializer, MessageSerializer
from .models import User, Message
from rest_framework import permissions
# Create your views here.


class UserView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
   
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['=email']

class MessageView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
