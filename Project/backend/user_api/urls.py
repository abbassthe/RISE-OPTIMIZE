 
from django.urls import path, include 
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
   path("password-reset/<str:encoded_pk>/<str:token>/",
          views.ResetPassword.as_view(),
         name="reset-password"),
    path("check-token/<str:encoded_pk>/<str:token>/",
          views.TokenCheck.as_view(),
         name="check-token"),
    path("password-reset/",
          views.PasswordReset.as_view(),
         name="reset-password")
]

# function asd(e: FormEvent) {
#     e.preventDefault();
#     // http://localhost:8000/userapi/check-token/MQ/cbt3gn-68122506fdd1ec749de8202f1870e27d/
#     // client.post("/userapi/password-reset/", {
#     //   email: email
#     // }).then(function (res) {
#     //   console.log(res.data.message)
#     // });

#     // client.post("/userapi/password-reset/MQ/cbtag1-b3cf83cdb1ac6dd1b613de06be5d88e3/", {
#     //   password: password
#     // }).then(function (res) {
#     //   console.log(res.data.message)
#     // });
#     // client.post("/userapi/check-token/MQ/cbta99-8431fa6a62d45a06f2de24b34e902c63/", {
#     // }).then(function (res) {
#     //   console.log(res.data.message)
#     // });
#   }