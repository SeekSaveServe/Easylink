from django.db import models

class Remote(models.Model):                 # the class for the remote data
    _DATABASE = 'remotedata'
    
    name = models.CharField(max_length=20)
    data = models.JSONField()