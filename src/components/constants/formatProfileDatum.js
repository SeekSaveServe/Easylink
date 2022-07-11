// function to take a user or project from join query and convert to array of strings format 
 // for user_skills, ints, comm

// in case the array is already correctly formatted (d will be string) don't change
export const mapName = arr => arr.map(d => typeof d === 'object' ? d.name : d);

export const isJoin = (user) => typeof(user.user_skills) == 'object'&& user.user_skills != null;

// format when isJoin: user_<tag>:[ { name:xxx }, ...]
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


// format when from API
export const formatProfileStringsToArray = (profile) => {
    return {
        ...profile,
        user_skills: stringToArray(profile.user_skills),
        user_interests: stringToArray(profile.user_interests),
        user_communities: stringToArray(profile.user_communities),
    }
}

// isJoin: skills, comms, ints are array of objects like [{ name:... }]
// not isJoin (from API): skills, comms, ints is a comma sep string
export function formatProfile(profile) {
    if (isJoin(profile)) {
        return formatProfileDatum(profile);
    } else {
        return formatProfileStringsToArray(profile);
    }
}