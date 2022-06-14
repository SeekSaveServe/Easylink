from django.contrib import admin
from app.models import Course, Table, Remote, Order, OrderItem,\
    Followers, Links, PollOptions, PollResults, PostReactions, Posts,\
    Projects, UniqueCommunities, UniqueInterests, UniqueSkills, UserCommunities,\
        UserInterests, UserSkills, Users

# Register your models here.
# admin.site.register(Course)
# admin.site.register(Table)
# admin.site.register(Remote)
# admin.site.register(Order)
# admin.site.register(OrderItem)
admin.site.register(Users)
admin.site.register(Projects)
