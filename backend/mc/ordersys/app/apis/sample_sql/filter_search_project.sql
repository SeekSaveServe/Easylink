SELECT
	projects.username,
	projects.pid,
	projects.avatar_url,
	projects.title,
	projects.bio,
	string_agg(distinct user_interests.name, ',') as interests,
	string_agg(distinct user_skills.name, ',') as skills,
	string_agg(distinct user_communities.name, ',') as communities,
	count(projects.pid = projects.pid) as count
from projects
inner join user_communities on projects.pid = user_communities.pid
inner join user_skills on projects.pid = user_skills.pid
inner join user_interests on projects.pid = user_interests.pid
where projects.username like '%1%'
and (user_communities.name in ('USP') 
or user_skills.name in ('Acting')
or user_interests.name in ('Sports', 'Arts&Music'))
group by projects.pid
order by count desc