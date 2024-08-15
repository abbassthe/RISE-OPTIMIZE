from rest_framework import serializers
from .models import User, Message   

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'id', 'email')
         
        
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'user', 'subject', 'msg')