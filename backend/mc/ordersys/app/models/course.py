# app/models/course.py
from django.db import models
class Course(models.Model):
    name = models.CharField(max_length=128)
    price = models.FloatField()
    def __str__(self):
        return f'Course - {self.name} - ${self.price}'