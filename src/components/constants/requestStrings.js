// To request user or project with user_skills, interests, comm. at the same time

export const userReq = `
*,
user_skills (
    name
),
user_interests(
    name
),
user_communities(
    name
)
`;

export const projReq = `
  *,
  user_skills (
      name
  ),
  user_interests(
      name
  ),
  user_communities!fk_pid(
      name
  )
  `;