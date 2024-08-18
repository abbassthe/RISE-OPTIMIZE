from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserSerializer,
    EmailSerializer,
    ResetPasswordSerializer,
    CheckToken,
)
from rest_framework import permissions, status, generics, viewsets, response
from .validations import custom_validation, validate_email, validate_password
from django.contrib.auth import get_user_model, authenticate
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse

from django.core.mail import send_mail
from django.conf import settings


UserModel = get_user_model()
# only user submits email address here, nothing else to ask


# reset password
class ResetPassword(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"kwargs": kwargs}
        )
        # serializer.is_valid(raise_exception=True)
        k = serializer.validate(request.data)
        if k == True:
            return response.Response(
                {"message": "Password reset complete"},
                status=status.HTTP_200_OK,
            )
        else:
            return response.Response(
                {"message": "Invalid token"},
                status=status.HTTP_200_OK,
            )


class TokenCheck(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CheckToken

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"kwargs": kwargs}
        )
        # serializer.is_valid(raise_exception=True)
        k = serializer.validate(request.data)
        if k == True:
            return response.Response(
                {"message": "Valid token"},
                status=status.HTTP_200_OK,
            )
        else:
            return response.Response(
                {"message": "Invalid token"},
                status=status.HTTP_200_OK,
            )


class PasswordReset(generics.GenericAPIView):

    permission_classes = (permissions.AllowAny,)
    serializer_class = EmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data["email"]
        user = UserModel.objects.filter(email=email).first()
        if user:
            encoded_pk = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)
            # localhost:8000/reset-password/<encoded_pk>/<token>
            reset_url = f"/password-reset/{encoded_pk}/{token}/"
            # reset_url = reverse("reset-password",
            # 		   kwargs={"encoded_pk":encoded_pk, "token": token})
            reset_url = f"http://localhost:5173{reset_url}"
            message = f"Your password reset link: {reset_url}"
            send_mail(
                "FlutterForecast - Reset Password",  # title
                message,  # message
                settings.EMAIL_HOST_USER,
                [email],  # receiver email
                fail_silently=False,
            )
            return response.Response(
                {
                    "message": f"We have sent a message to your email if such exists to reset the password"
                },
                status=status.HTTP_200_OK,
            )
        else:
            return response.Response(
                {
                    "message": "We have sent a message to your email if such exists to reset the password"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )  # user dont exist but no need to tell the requester


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        if (
            (clean_data == "Email is taken, choose another one.")
            or (clean_data == "Choose another password, min 8 characters")
            or (clean_data == "Username is taken, choose another one.")
        ):
            return Response(
                {"message": f"{clean_data}"}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"message": f"Unknown error"}, status=status.HTTP_400_BAD_REQUEST
        )


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    ##
    def post(self, request):
        data = request.data
        # assert validate_email(data)
        k = validate_email(data)
        if k != "True":

            return Response({"message": f"{k}"}, status=status.HTTP_400_BAD_REQUEST)
        # assert validate_password(data)
        k = validate_password(data)
        if k != "True":
            return Response({"message": f"{k}"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserLoginSerializer(data=data)

        if serializer.is_valid():
            user = serializer.check_user(data)
            if user == "User not found":
                print(user)
                return Response(
                    {"message": f"Invalid email or password. Please try again."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                login(request, user)
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": f"Invalid email or password. Please try again."},
                status=status.HTTP_400_BAD_REQUEST,
            )


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
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)
