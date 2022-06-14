# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Followers(models.Model):
    s_n = models.BigIntegerField(primary_key=True)
    followed_uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='followed_uid', blank=True, null=True, related_name ='followed_uid')
    follower_uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='follower_uid', blank=True, null=True, related_name = 'follower_uid')
    followed_pid = models.ForeignKey('Projects', models.DO_NOTHING, db_column='followed_pid', blank=True, null=True, related_name = 'followed_pid')
    follower_pid = models.ForeignKey('Projects', models.DO_NOTHING, db_column='follower_pid', blank=True, null=True, related_name = 'follower_pid')
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'followers'


class Links(models.Model):
    s_n = models.BigIntegerField(primary_key=True)
    uid_sender = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid_sender', blank=True, null=True, related_name = 'uid_sender')
    uid_receiver = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid_receiver', blank=True, null=True, related_name = 'uid_receiver')
    pid_sender = models.ForeignKey('Projects', models.DO_NOTHING, db_column='pid_sender', blank=True, null=True, related_name = 'pid_sender')
    pid_receiver = models.ForeignKey('Projects', models.DO_NOTHING, db_column='pid_receiver', blank=True, null=True, related_name = 'pid_receiver')
    accepted = models.BooleanField(blank=True, null=True)
    rejected = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'links'


class PollOptions(models.Model):
    options_id = models.UUIDField(primary_key=True)
    post = models.ForeignKey('Posts', models.DO_NOTHING, blank=True, null=True)
    option = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'poll_options'


class PollResults(models.Model):
    s_n = models.UUIDField(primary_key=True)
    options = models.ForeignKey(PollOptions, models.DO_NOTHING)
    pid = models.ForeignKey('Projects', models.DO_NOTHING, db_column='pid', blank=True, null=True)
    uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'poll_results'


class PostReactions(models.Model):
    s_n = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    pid = models.ForeignKey('Projects', models.DO_NOTHING, db_column='pid', blank=True, null=True)
    uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid', blank=True, null=True)
    post = models.ForeignKey('Posts', models.DO_NOTHING, blank=True, null=True)
    reaction1 = models.BooleanField(blank=True, null=True)
    reaction2 = models.BooleanField(blank=True, null=True)
    reaction3 = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'post_reactions'


class Posts(models.Model):
    s_n = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    pid = models.ForeignKey('Projects', models.DO_NOTHING, db_column='pid', blank=True, null=True)
    reaction1 = models.IntegerField(blank=True, null=True)
    reaction2 = models.IntegerField(blank=True, null=True)
    reaction3 = models.IntegerField(blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    ispoll = models.BooleanField(db_column='isPoll', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'posts'


class Projects(models.Model):
    pid = models.BigIntegerField(primary_key=True)
    created_at = models.DateTimeField(blank=True, null=True)
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)
    uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid')
    username = models.TextField(blank=True, null=True)
    avatar_url = models.TextField(blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    telegram = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    profile_visibility = models.TextField(blank=True, null=True)
    telegram_visibility = models.TextField(blank=True, null=True)
    email_visibility = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'projects'


class UniqueCommunities(models.Model):
    created_at = models.DateTimeField(blank=True, null=True)
    name = models.TextField(primary_key=True)
    in_login = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'unique_communities'


class UniqueInterests(models.Model):
    created_at = models.DateTimeField(blank=True, null=True)
    name = models.TextField(primary_key=True)
    in_login = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'unique_interests'


class UniqueSkills(models.Model):
    created_at = models.DateTimeField(blank=True, null=True)
    name = models.TextField(primary_key=True)
    in_login = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'unique_skills'


class UserCommunities(models.Model):
    s_n = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField()
    uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid', blank=True, null=True)
    pid = models.ForeignKey(Projects, models.DO_NOTHING, db_column='pid', blank=True, null=True)
    name = models.ForeignKey(UniqueCommunities, models.DO_NOTHING, db_column='name')

    class Meta:
        managed = False
        db_table = 'user_communities'


class UserInterests(models.Model):
    s_n = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField()
    uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid', blank=True, null=True)
    pid = models.ForeignKey(Projects, models.DO_NOTHING, db_column='pid', blank=True, null=True)
    name = models.ForeignKey(UniqueInterests, models.DO_NOTHING, db_column='name')

    class Meta:
        managed = False
        db_table = 'user_interests'


class UserSkills(models.Model):
    s_n = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField()
    uid = models.ForeignKey('Users', models.DO_NOTHING, db_column='uid', blank=True, null=True)
    pid = models.ForeignKey(Projects, models.DO_NOTHING, db_column='pid', blank=True, null=True)
    name = models.ForeignKey(UniqueSkills, models.DO_NOTHING, db_column='name')

    class Meta:
        managed = False
        db_table = 'user_skills'


class Users(models.Model):
    id = models.UUIDField(primary_key=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    username = models.TextField(unique=True, blank=True, null=True)
    avatar_url = models.TextField(blank=True, null=True)
    telegram = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    profile_visibility = models.TextField(blank=True, null=True)
    telegram_visibility = models.TextField(blank=True, null=True)
    email_visibility = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
