from rest_framework import serializers
from app.models import Projects

class ProjectSerializer(serializers.ModelSerializer):
    user_communities = serializers.CharField(read_only=True)
    user_skills = serializers.CharField(read_only=True)
    user_interests = serializers.CharField(read_only=True)
    count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Projects
        fields = "__all__"