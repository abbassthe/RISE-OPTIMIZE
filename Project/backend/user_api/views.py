from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		if ((clean_data == "Email is taken, choose another one.") or (clean_data == "Choose another password, min 8 characters" ) or (clean_data == "Username is taken, choose another one.")):
			return Response({"message": f'{clean_data}'}, status=status.HTTP_400_BAD_REQUEST)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response({"message": f'Unknown error'},status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		# assert validate_email(data)
		k = validate_email(data)
		if (k != 'True'):
	
			return Response({"message": f'{k}'}, status=status.HTTP_400_BAD_REQUEST)
		# assert validate_password(data)
		k = validate_password(data)
		if (k != 'True'):
			return Response({"message": f'{k}'}, status=status.HTTP_400_BAD_REQUEST)
		serializer = UserLoginSerializer(data=data)
 
		if serializer.is_valid():
			user = serializer.check_user(data)
			if (user == "User not found"):
				print(user)
				return Response({"message": f'Invalid email or password. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				login(request, user)
				return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			return Response({"message": f'Invalid email or password. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)