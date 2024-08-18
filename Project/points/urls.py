from django.urls import path
from .views import EggsData

urlpatterns = [
    path("eggs/<int:year>/", EggsData.as_view(), name="eggs-data"),
]
