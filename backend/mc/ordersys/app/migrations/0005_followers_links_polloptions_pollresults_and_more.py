# Generated by Django 4.0.5 on 2022-06-21 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_orderitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='Followers',
            fields=[
                ('s_n', models.BigIntegerField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'followers',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Links',
            fields=[
                ('s_n', models.BigIntegerField(primary_key=True, serialize=False)),
                ('accepted', models.BooleanField(blank=True, null=True)),
                ('rejected', models.BooleanField(blank=True, null=True)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'links',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PollOptions',
            fields=[
                ('options_id', models.UUIDField(primary_key=True, serialize=False)),
                ('option', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'poll_options',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PollResults',
            fields=[
                ('s_n', models.UUIDField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'poll_results',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PostReactions',
            fields=[
                ('s_n', models.UUIDField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('reaction1', models.BooleanField(blank=True, null=True)),
                ('reaction2', models.BooleanField(blank=True, null=True)),
                ('reaction3', models.BooleanField(blank=True, null=True)),
            ],
            options={
                'db_table': 'post_reactions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('s_n', models.UUIDField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('reaction1', models.IntegerField(blank=True, null=True)),
                ('reaction2', models.IntegerField(blank=True, null=True)),
                ('reaction3', models.IntegerField(blank=True, null=True)),
                ('body', models.TextField(blank=True, null=True)),
                ('ispoll', models.BooleanField(blank=True, db_column='isPoll', null=True)),
            ],
            options={
                'db_table': 'posts',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('pid', models.BigIntegerField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('username', models.TextField(blank=True, null=True)),
                ('avatar_url', models.TextField(blank=True, null=True)),
                ('title', models.TextField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('telegram', models.TextField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('profile_visibility', models.TextField(blank=True, null=True)),
                ('telegram_visibility', models.TextField(blank=True, null=True)),
                ('email_visibility', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'projects',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UniqueCommunities',
            fields=[
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.TextField(primary_key=True, serialize=False)),
                ('in_login', models.BooleanField(blank=True, null=True)),
            ],
            options={
                'db_table': 'unique_communities',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UniqueInterests',
            fields=[
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.TextField(primary_key=True, serialize=False)),
                ('in_login', models.BooleanField(blank=True, null=True)),
            ],
            options={
                'db_table': 'unique_interests',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UniqueSkills',
            fields=[
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.TextField(primary_key=True, serialize=False)),
                ('in_login', models.BooleanField(blank=True, null=True)),
            ],
            options={
                'db_table': 'unique_skills',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserCommunities',
            fields=[
                ('s_n', models.UUIDField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'user_communities',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserInterests',
            fields=[
                ('s_n', models.UUIDField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'user_interests',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('username', models.TextField(blank=True, null=True, unique=True)),
                ('avatar_url', models.TextField(blank=True, null=True)),
                ('telegram', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('title', models.TextField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('profile_visibility', models.TextField(blank=True, null=True)),
                ('telegram_visibility', models.TextField(blank=True, null=True)),
                ('email_visibility', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserSkills',
            fields=[
                ('s_n', models.UUIDField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'user_skills',
                'managed': False,
            },
        ),
    ]
