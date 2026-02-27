import uuid
from django.db import models


class Owner(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30)
    address = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "owners"

    def __str__(self):
        return self.name


class Species(models.Model):
    """
    Catálogo de especies (Perro, Gato, Ave, Conejo, etc.)
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=50, unique=True)  # Perro
    slug = models.SlugField(max_length=50, unique=True)  # perro

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "species"
        verbose_name = "Species"
        verbose_name_plural = "Species"

    def __str__(self):
        return self.name


class Patient(models.Model):

    class Gender(models.TextChoices):
        MALE = "macho", "Macho"
        FEMALE = "hembra", "Hembra"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    owner = models.ForeignKey(
        Owner,
        on_delete=models.CASCADE,
        related_name="patients"
    )

    species = models.ForeignKey(
        Species,
        on_delete=models.PROTECT,
        related_name="patients"
    )

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100, blank=True, null=True)

    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)

    microchip = models.CharField(max_length=50, blank=True, null=True, unique=True)

    weight = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    allergies = models.JSONField(default=list, blank=True)
    chronic_conditions = models.JSONField(default=list, blank=True)

    notes = models.TextField(blank=True, null=True)

    registration_date = models.DateTimeField(auto_now_add=True)
    last_visit = models.DateField(blank=True, null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "patients"

    def __str__(self):
        return f"{self.name} ({self.species.name})"
