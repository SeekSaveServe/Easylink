from django.db import models
from app.models.tables import Table
from django.utils.timezone import now

class Order(models.Model):
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

    date = models.DateField(default=now)
    calling_number = models.PositiveSmallIntegerField(unique_for_date='date')
    status = models.CharField(max_length=2, choices=STATUSES, default=STATUS_RECEIVED)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)

    def __str__(self):
        return f'Order[{self.calling_number} - Table {self.table} - {self.status}]'