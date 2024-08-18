from rest_framework import serializers
from .models import Egg


class EggSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egg
        fields = ["geom", "year"]
