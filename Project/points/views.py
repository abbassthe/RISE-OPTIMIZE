from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Egg
from .serializer import EggSerializer
from rest_framework.views import APIView


class EggsData(APIView):
    def get(self, request, year):
        eggs = Egg.objects.filter(year=year)
        serializer = EggSerializer(eggs, many=True)
        return Response(serializer.data)
