from django.db import models
from app.models import Course, Order

class OrderItem(models.Model):
    STATUS_RECEIVED = 'C'
    STATUS_PREPARING = 'P'
    STATUS_READY = 'R'
    STATUS_DELIVERED = 'D'

    STATUSES = [
        (STATUS_DELIVERED, 'Delivered'),
        (STATUS_PREPARING, 'Preparing'),
        (STATUS_READY, 'Ready'),
        (STATUS_RECEIVED, 'Received'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    requirements = models.TextField(default='', blank=True)
    status = models.CharField(max_length=2, choices=STATUSES, default=STATUS_RECEIVED)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    