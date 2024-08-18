from django.db import models

# Create your models here.
from django.contrib.gis.db import models


class Locust(models.Model):

    geom = models.PointField()  # PostGIS field for geometry
    l = models.BooleanField()
