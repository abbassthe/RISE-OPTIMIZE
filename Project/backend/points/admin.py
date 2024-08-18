from django.contrib import admin

# Register your models here.
from django.contrib.gis import admin

from points.models import Egg


@admin.register(Egg)
class EggAdmin(admin.GISModelAdmin):
    list_display = ("longitude", "latitude", "geom")
