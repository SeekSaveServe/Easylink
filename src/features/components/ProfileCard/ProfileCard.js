import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CardActions,
  Stack,
  CardMedia,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from "./ProfileCard.module.css";
import { useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";
import BasicButton from "../../../components/BasicButton/BasicButton.js";
import Tag from "../../../components/Tag/Tag.jsx";
import {
  AddLinkOutlined,
  RssFeedOutlined,
  CancelOutlined,
  Email,
  Telegram,
} from "@mui/icons-material";
import { format, formatDistance } from "date-fns";
import TooltipIconButton from "../../../components/TooltipIconButton/TooltipIconButton.jsx";

// assumption: passed in data has structure
// isJoin == true: { ...user/project, user_skills:[Tag], user_communities:[Tag], user_interests: [Tag] }
// 2nd assumption: projects have field pid, user has no pid
// where Tag has structure { name: xxx } -> e.g user_skills: [ { name: 'JS'}, { name: 'Acting' } ]
// skills, comm, interests can be retrieved in same query through join

// isJoin == false: { ...user/project, user_skills:"...", user_communities:"...", user_interests: "..."}
// where "..." is null, "", "singleton" or comma separated string

function ProfileCard({ info, isJoin }) {
  // let { isProject, info } = props;

  const isProject = "pid" in info;

  const email = info.email;
  const telegram = info.telegram;

  // TODO: email/tele vis: "afterlink" || "everyone" -> calculate based on if viewing user has linked
  const showEmail = Boolean(info.email);
  const showTele = Boolean(info.telegram);

  const mapName = (d) => d.name; // for join query in links

  // comma sep string to array - for isJoin false
  const stringToArray = (string) => {
    // console.log("type check", typeof string, string);
    string = string.toString().trim();
    if (!Boolean(string)) return []; // covers null,undefined, ""

    return string.split(",");
  };
  //   console.log(info.user_skills);
  const user_skills = isJoin
    ? info.user_skills.map(mapName)
    : stringToArray(info.user_skills);
  const user_interests = isJoin
    ? info.user_interests.map(mapName)
    : stringToArray(info.user_interests);
  const user_communities = isJoin
    ? info.user_communities.map(mapName)
    : stringToArray(info.user_communities);

  const wordsToTags = (tagStrings, bgColor, fontColor) => {
    return (
      <div style={{ display: "inline-flex", gap: "3px" }}>
        {tagStrings.map((str, idx) => {
          return (
            <Tag key={idx} color={bgColor} fontColor={fontColor}>
              {str}
            </Tag>
          );
        })}
      </div>
    );
  };

  const skills = () => {
    const prefix = isProject
      ? "Looking for people who know "
      : "My skills are ";
    return (
      <>
        {prefix} {wordsToTags(user_skills, "var(--primary)", "white")}
      </>
    );
  };

  const interests = () => {
    const prefix = isProject ? "Our interests are " : "I am interested in ";
    return (
      <>
        {prefix} {wordsToTags(user_interests, "var(--secondary)", "white")}
      </>
    );
  };

  const communities = () => {
    return user_communities.join(", ");
  };

  const emailDisplay = () => {
    return showEmail ? (
      <Typography
        variant="body1"
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          mr: 1,
        }}
      >
        <Email sx={{ mr: 0.5 }} /> {email}
      </Typography>
    ) : (
      <></>
    );
  };

  const teleDisplay = () => {
    return showTele ? (
      <Typography
        variant="body1"
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          mr: 2,
        }}
      >
        <Telegram /> {telegram}
      </Typography>
    ) : (
      <></>
    );
  };

  const Bio = () => {
    if (!info.bio) return "";
    return (
      <>
        {info.bio} <br></br>
      </>
    );
  };

  // calculate dateRange string given start/end date “MMM d Y to MMM d Y”,  call only if isProject
  const dateRange = () => {
    const dateString = (date) => format(new Date(date), "MMM d Y");

    if (!info.start_date && !info.end_date) return "";

    // show only one of the dates if the other is null
    if (!info.start_date) {
      return "End: " + dateString(info.end_date);
    } else if (!info.end_date) {
      return "Start: " + dateString(info.start_date);
    }

    return `${dateString(info.start_date)} to ${dateString(info.end_date)}`;
  };

  // for the e.g '4 days ago' subheader based on created_at
  const timeAgo = () => {
    if (!info.created_at) return "";
    return formatDistance(new Date(info.created_at), new Date()) + " ago";
  };

  return (
    <Card className={styles.card}>
      <Box className={styles.card_content}>
        <Stack direction="row" alignContent="center">
          {/* TODO: replace subheader with calc based on created_at  */}
          <CardHeader
            title={info.username}
            subheader={timeAgo()}
            avatar={
              <LinkableAvatar
                src={info.avatar_url}
                imgProps={{ style: { objectFit: "stretch" } }}
              />
            }
            sx={{ ml: 0 }}
          />
        </Stack>

        <CardContent sx={{ mt: 0, width: "100%" }}>
          {info.title ? (
            <Typography variant="h5" sx={{ fontSize: "1.4rem" }} gutterBottom>
              {" "}
              {info.title}
            </Typography>
          ) : (
            <></>
          )}

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1rem", width: "100%" }}
          >
            <Bio />
            {interests()} {skills()}{" "}
          </Typography>

          {info.user_communities.length > 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Communities: {communities()}{" "}
            </Typography>
          ) : (
            <></>
          )}

          <CardActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ ml: -1, mt: 1, width: "100%", alignItems: "center" }}
            >
              <Typography
                variant="subtitle1"
                className={styles.tag}
                sx={{ backgroundColor: "var(--tag-grey)" }}
              >
                {isProject ? "Project" : "User"}
              </Typography>

              {isProject ? (
                <Typography variant="body" sx={{ alignSelf: "center" }}>
                  {" "}
                  {dateRange()}{" "}
                </Typography>
              ) : (
                <></>
              )}

              {/* Icon Buttons */}

              <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                <TooltipIconButton
                  icon={
                    <AddLinkOutlined color="primary" sx={{ fontSize: 30 }} />
                  }
                  title="Link"
                />
                {isProject ? (
                  <TooltipIconButton
                    icon={
                      <RssFeedOutlined
                        sx={{ color: "var(--secondary)", fontSize: 30 }}
                      />
                    }
                    title={"Follow"}
                  />
                ) : (
                  <></>
                )}
                <TooltipIconButton
                  icon={
                    <CancelOutlined
                      sx={{ fontSize: 30, color: "error.main" }}
                    />
                  }
                  title="Not for me"
                />
              </div>
            </Stack>

            {/* Email, Tele */}
            {emailDisplay()}
            {teleDisplay()}
          </CardActions>
        </CardContent>
      </Box>

      <Divider orientation="vertical" flexItem />
      {/* <LinkableAvatar sx={{ width: "10%", height: "auto" }} variant="square" src={info.avatar_url} imgProps={{style: {objectFit: "contain"}}}/>        */}
    </Card>
  );
}

export default ProfileCard;
