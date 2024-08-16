from django.db import models

# Create your models here.
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class Egg(models.Model):
    longitude = models.FloatField()
    latitude = models.FloatField()
    geom = models.PointField()  # PostGIS field for geometry

    def save(self, *args, **kwargs):
        if not self.geom:
            self.geom = Point(self.longitude, self.latitude)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.longitude}  , {self.latitude}"
