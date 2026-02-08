from django.db import models


class Pet(models.Model):
    owner_name = models.CharField(max_length=150)
    owner_phone = models.CharField(max_length=50)
    owner_email = models.EmailField(null=True, blank=True)

    name = models.CharField(max_length=100)
    species = models.CharField(max_length=20)
    breed = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "patients_pet"

    
    def __str__(self) -> str:
        return f"{self.name} ({self.owner_name})" 