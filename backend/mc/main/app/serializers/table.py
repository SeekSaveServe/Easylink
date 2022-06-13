from rest_framework import serializers
from app.models import Table

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields ='__all__'