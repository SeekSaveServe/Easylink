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
export const stringToArray = (string) => {
    string = string.trim();
    if (!Boolean(string)) return []; // covers null,undefined, ""

    return string.split(",");
  };


export const formatProfileStringsToArray = (profile) => {
    return {
        ...profile,
        user_skills: stringToArray(profile.user_skills),
        user_interests: stringToArray(profile.user_interests),
        user_communities: stringToArray(profile.user_communities),
    }
}