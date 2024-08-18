from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

class AppUserAdmin(UserAdmin):
    # Specify the fields to display in the list view
    list_display = ('email', 'username', 'fullname', 'phone', 'is_staff', 'is_superuser')
    
    # Fields to filter by in the list view
    list_filter = ('is_staff', 'is_superuser')
    
    # Fields that should be used for searching
    search_fields = ('email', 'username', 'fullname')
    
    # Fields to show in the admin detail view
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('username', 'fullname', 'phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser')})
    )
    
    # Fields to show when adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'fullname', 'phone', 'password'),
        }),
    )
    
    # Fields used for ordering
    ordering = ('email',)
    

# Register the custom admin class with the AppUser model
admin.site.register(AppUser, AppUserAdmin)