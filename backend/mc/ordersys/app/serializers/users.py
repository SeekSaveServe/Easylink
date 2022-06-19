from rest_framework import serializers
from app.models import Users

class UserSerializer(serializers.ModelSerializer):
    user_communities = serializers.CharField(read_only=True)
    user_skills = serializers.CharField(read_only=True)
    user_interests = serializers.CharField(read_only=True)
    count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Users
        fields = "__all__"