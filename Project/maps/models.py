from django.db import models

# Create your models here.
from django.contrib.gis.db import models


class Marker(models.Model):
    location = models.PointField()
    Confidence = models.DecimalField(max_digits=10, decimal_places=10)

    def __str__(self):
        return "Locust breeding spot"
