from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=200) 
    name = models.CharField(max_length=200) 
    def __str__(self):
        return self.name
    
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # foreign key sincew e dont know type of item we are getting
    subject = models.CharField(max_length=300) 
    msg = models.CharField(max_length=300) 

    def __str__(self):  
        return self.msg 