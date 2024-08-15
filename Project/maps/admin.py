from django.contrib import admin

# Register your models here.
from django.contrib.gis import admin

from maps.models import Marker


@admin.register(Marker)
class MarkerAdmin(admin.GISModelAdmin):
    list_display = ("Confidence", "location")
