from django.forms import ValidationError
from rest_framework import serializers
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator

UserModel = get_user_model()


# reset password models
class EmailSerializer(serializers.Serializer):
	email = serializers.EmailField()
	class Meta:
	   fields = ("email",)

class CheckToken(serializers.Serializer):

	def validate(self, data): 
		token = self.context.get("kwargs").get("token")
		encoded_pk = self.context.get("kwargs").get("encoded_pk")
		if token is None or encoded_pk is None:
			return False
			#raise serializers.ValidationError("Missing data")
		pk = urlsafe_base64_decode(encoded_pk).decode()
		user = UserModel.objects.get(pk=pk)

		if not PasswordResetTokenGenerator().check_token(user, token):
			return False
		#	raise serializers.ValidationError("The reset token is invalid")
		return True
		#return data
#	raise serializers.ValidationError("The reset token is invalid")
		
class ResetPasswordSerializer(serializers.Serializer):
	password = serializers.CharField(
		write_only=True,
		min_length=8,
	)
	class Meta:
		fields = ("password", )

	def validate(self, data):
		password = data.get("password")
		token = self.context.get("kwargs").get("token")
		encoded_pk = self.context.get("kwargs").get("encoded_pk")

		if token is None or encoded_pk is None:
			return False
			#raise serializers.ValidationError("Missing data")
		
		pk = urlsafe_base64_decode(encoded_pk).decode()
		user = UserModel.objects.get(pk=pk)

		if not PasswordResetTokenGenerator().check_token(user, token):
			return False
			#raise serializers.ValidationError("The reset token is invalid")
		user.set_password(password)
		user.save()
		return True
	#	return data

























class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], username=clean_data['username'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.fullname = clean_data['fullname']
		user_obj.phone = clean_data['phone']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			# raise ValidationError('user not found')
			return 'User not found'
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username', 'fullname', 'phone')