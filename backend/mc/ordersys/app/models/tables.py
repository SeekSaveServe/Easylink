from django.db import models

class Table(models.Model):
    index = models.SmallIntegerField(unique=True)
    location = models.CharField(max_length=64, null=True)

    def __str__(self):
        return f'Table {self.index} @ {self.location}'