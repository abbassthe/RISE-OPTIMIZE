from django.contrib import admin

# Register your models here.
from django.contrib.gis import admin

from maps.models import Locust


@admin.register(Locust)
class LocustAdmin(admin.GISModelAdmin):
    list_display = ("l", "geom")
