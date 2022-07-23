import { projectFetcher } from "../e2e/utils/utils";

// Fixed data for use in profile test
export const teleVisProfile = {
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

export const emailVisProfile = {
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

export const bothVisProfile = {
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

export const bothNotVisProfile = {
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