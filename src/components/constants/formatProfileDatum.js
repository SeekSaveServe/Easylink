// function to take a user or project from join query and convert to array of strings format 
 // for user_skills, ints, comm

const mapName = arr => arr.map(d => d.name);

export function formatProfileDatum(datum) {
    return {
        ...datum,
        user_skills: mapName(datum.user_skills),
        user_interests: mapName(datum.user_interests),
        user_communities: mapName(datum.user_communities)
    }
}