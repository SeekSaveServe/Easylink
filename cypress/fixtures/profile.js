export const profileTestAccount = {
    "user_skills": [
        "Finance",
        "Programming"
    ],
    "user_interests": [
        "Sports"
    ],
    "user_communities": [
        "GUI"
    ],
    "id": "8c275f51-d18a-4972-b345-9c00611a915c",
    "updated_at": null,
    "username": "profiletestacct",
    "avatar_url": "",
    "telegram": "profiletest",
    "email": "profiletestacct@gmail.com",
    "title": "profile test title",
    "bio": "profile test bio",
    "created_at": "2022-07-20T07:29:13.840976+00:00",
    "profile_visibility": null,
    "telegram_visibility": "everyone",
    "email_visibility": "everyone",
    password: "6"+"6"+"1"+"2"+"6"+"6"
}



// test account for profile or profile card related login
export const email = profileTestAccount.email;
export const username= profileTestAccount.username;
export const password = profileTestAccount.password;
export const id = profileTestAccount.id;
// Fixed data for use in profile test 
    // not possible to fetch using supabase dynamically during test
export const teleVisProfileProject = {
    "pid": 202,
    "created_at": "2022-07-23T13:03:41.246661+00:00",
    "parent_id": null,
    "uid": "f8617506-2937-4630-96fe-1c1f8089539e",
    "username": "Project with tele visible only",
    "avatar_url": null,
    "title": "This project has only tele visible to all",
    "bio": "Only tele visible to all",
    "telegram": "visibletele",
    "updated_at": null,
    "profile_visibility": null,
    "telegram_visibility": "everyone",
    "email_visibility": "afterlink",
    "email": "invisibleemail@email.com",
    "end_date": null,
    "start_date": null,
    "user_skills": [
        "Finance"
    ],
    "user_interests": [
        "Sports"
    ],
    "user_communities": [
        "USP"
    ],
    "childrenIds": []
};

export const emailVisProfileProject = {
    "pid": 203,
    "created_at": "2022-07-23T13:04:20.229099+00:00",
    "parent_id": null,
    "uid": "f8617506-2937-4630-96fe-1c1f8089539e",
    "username": "Project with email visible only",
    "avatar_url": null,
    "title": "Only email vis to everyone",
    "bio": "Only email vis to all",
    "telegram": "invisibletele",
    "updated_at": null,
    "profile_visibility": null,
    "telegram_visibility": "afterlink",
    "email_visibility": "everyone",
    "email": "visibleemail@email.com",
    "end_date": null,
    "start_date": null,
    "user_skills": [
        "Finance"
    ],
    "user_interests": [
        "Learning"
    ],
    "user_communities": [
        "GUI"
    ],
    "childrenIds": []
};

export const bothVisProfileProject = {
    "pid": 204,
    "created_at": "2022-07-23T13:05:19.041875+00:00",
    "parent_id": null,
    "uid": "f8617506-2937-4630-96fe-1c1f8089539e",
    "username": "Project with both contact visible",
    "avatar_url": null,
    "title": "Both email and tele visible",
    "bio": "Email and tele visible",
    "telegram": "visibletele",
    "updated_at": null,
    "profile_visibility": null,
    "telegram_visibility": "everyone",
    "email_visibility": "everyone",
    "email": "visibleemail",
    "end_date": null,
    "start_date": null,
    "user_skills": [
        "Programming"
    ],
    "user_interests": [
        "Service"
    ],
    "user_communities": [
        "House"
    ],
    "childrenIds": []
};

export const bothNotVisProfileProject = {
    "pid": 205,
    "created_at": "2022-07-23T13:05:57.639718+00:00",
    "parent_id": null,
    "uid": "f8617506-2937-4630-96fe-1c1f8089539e",
    "username": "Project with no contact visible",
    "avatar_url": null,
    "title": "Both not visible until link",
    "bio": "Both tele and email not visible until link",
    "telegram": "invisibletele",
    "updated_at": null,
    "profile_visibility": null,
    "telegram_visibility": "afterlink",
    "email_visibility": "afterlink",
    "email": "invisibleemail@email.com",
    "end_date": null,
    "start_date": null,
    "user_skills": [
        "Writing",
        "Finance"
    ],
    "user_interests": [
        "Arts and Music"
    ],
    "user_communities": [
        "House"
    ],
    "childrenIds": []
}

export const bothNotVisProfileUser = {
    "user_skills": [
        "Programming",
        "Finance"
    ],
    "user_interests": [
        "Sports"
    ],
    "user_communities": [
        "USP",
        "GUI"
    ],
    "username": "usernonevis",
    "email": "nonevis@gmail.com",
    "telegram": "nonevistele",
    "avatar_url": "",
    "id": "0a5c73a0-c5c5-415c-9c0e-24d2af311095",
    "updated_at": null,
    "title": "None vis user",
    "bio": "user has none vis contact details",
    "created_at": "2022-07-23T16:48:25.188714+00:00",
    "profile_visibility": null,
    "telegram_visibility": "afterlink",
    "email_visibility": "afterlink"
}

export const teleVisProfileUser = {
    "user_skills": [
        "Finance",
        "Programming"
    ],
    "user_interests": [
        "Sports"
    ],
    "user_communities": [
        "USP"
    ],
    "username": "televisuser",
    "email": "televisuser@gmail.com",
    "telegram": "televisuser",
    "avatar_url": "",
    "id": "e215df5e-1f72-4435-b5c8-fe8eb67bf4af",
    "updated_at": null,
    "title": "televisuser",
    "bio": "televisuser",
    "created_at": "2022-07-23T16:50:35.21465+00:00",
    "profile_visibility": null,
    "telegram_visibility": "everyone",
    "email_visibility": "afterlink"
}

export const emailVisProfileUser = {
    "user_skills": [
        "Finance"
    ],
    "user_interests": [
        "Sports",
        "Service"
    ],
    "user_communities": [
        "USP"
    ],
    "username": "emailvisuser",
    "email": "emailvis@gmail.com",
    "telegram": "emailvis",
    "avatar_url": "",
    "id": "09b9dcf9-3491-43af-adbc-374fd58b7db1",
    "updated_at": null,
    "title": "emailvisuser",
    "bio": "email vis user",
    "created_at": "2022-07-23T16:51:44.156277+00:00",
    "profile_visibility": null,
    "telegram_visibility": "afterlink",
    "email_visibility": "everyone"
}

export const bothVisProfileUser = {
    "user_skills": [
        "Writing",
        "Public Speaking"
    ],
    "user_interests": [
        "Service",
        "Sports"
    ],
    "user_communities": [
        "GUI",
        "Interest Groups"
    ],
    "username": "bothvisuser",
    "email": "bothvis@gmail.com",
    "telegram": "bothvis",
    "avatar_url": "",
    "id": "206beffd-de0a-4f44-af03-561a5c143739",
    "updated_at": null,
    "title": "bothvisuser",
    "bio": "bothvisuser",
    "created_at": "2022-07-23T16:52:46.559115+00:00",
    "profile_visibility": null,
    "telegram_visibility": "everyone",
    "email_visibility": "everyone"
}