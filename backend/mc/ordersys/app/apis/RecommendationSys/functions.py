"""
This file contains useful functions to convert user data to documents,
and for updating the 'average' profile viewed by the user.

update_profile:
- Updates average user profile after user action

get_users:
- Obtain user preferences as a list of strings (key words)
"""

# import importlib.util
# import sys
# spec = importlib.util.spec_from_file_location("models.py", "C:/Users/peich/OneDrive/Desktop/Easylink repo/Easylink/Backend/mc/ordersys/app/models.py")
# foo = importlib.util.module_from_spec(spec)
# sys.modules["module.name"] = foo
# spec.loader.exec_module(foo)
# foo.MyClass()

# from app.models import Users, Projects
import psycopg2    
import os
from dotenv import load_dotenv

def update_profile(actionType: int, profile_viewed: list[str]) -> None:
    pass

def get_users() -> list[(str,str)]:
    conn = psycopg2.connect(host='db.xdhbumuosjqmchdyollz.supabase.co',
    database="postgres",
    user="postgres",
    password='easylinkP@ssW0rd@1'  )  
    # create a cursor
    cur = conn.cursor()
    raw_request_user = """
    SELECT
            users.id,
            string_agg(distinct user_communities.name, ',') ||
            string_agg(distinct user_interests.name, ',') ||
            string_agg(distinct user_skills.name, ',') as tags
        from users
        inner join user_skills on users.id = user_skills.uid
        inner join user_communities on users.id = user_communities.uid
        inner join user_interests on users.id = user_interests.uid
		Group by users.id
    """
    cur.execute(raw_request_user)
    users = cur.fetchall()
    cur.close()
    return users

def get_projects() -> "json":
    conn = psycopg2.connect(host='db.xdhbumuosjqmchdyollz.supabase.co',
    database="postgres",
    user="postgres",
    password='easylinkP@ssW0rd@1'  )  
    # create a cursor
    cur = conn.cursor()
        
    raw_request_project = """SELECT
            projects.pid,
            string_agg(distinct user_communities.name, ',') ||
            string_agg(distinct user_interests.name, ',') ||
            string_agg(distinct user_skills.name, ',') as tags
        from projects
        inner join user_skills on projects.pid = user_skills.pid
        inner join user_communities on projects.pid = user_communities.pid
        inner join user_interests on projects.pid = user_interests.pid
		Group by projects.pid"""
    cur.execute(raw_request_project)
    projects = cur.fetchall()
    cur.close()
    return projects

# print(get_users())