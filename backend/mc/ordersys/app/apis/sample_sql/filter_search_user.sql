SELECT
	users.username,
	users.id,
	users.avatar_url,
	users.title,
	users.bio,
	string_agg(distinct user_interests.name, ',') as interests,
	string_agg(distinct user_skills.name, ',') as skills,
	string_agg(distinct user_communities.name, ',') as communities,
	count(users.id = users.id) as count
from users
inner join user_communities on users.id = user_communities.uid
inner join user_skills on users.id = user_skills.uid
inner join user_interests on users.id = user_interests.uid
where user_communities.name in ('USP') 
or user_skills.name in ('Acting')
or user_interests.name in ('Sports', 'Arts&Music')
group by users.id
order by count desc