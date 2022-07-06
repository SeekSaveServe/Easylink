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
  CircularProgress,
} from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from "./ProfileCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";
import BasicButton from "../../../components/BasicButton/BasicButton.js";
import Tag from "../../../components/Tag/Tag.jsx";
import {
  AddLinkOutlined,
  RssFeedOutlined,
  CancelOutlined,
  Email,
  Telegram,
  DeleteOutlined,
  FamilyRestroomRounded,
  LeakRemoveOutlined,
} from "@mui/icons-material";
import { format, formatDistance } from "date-fns";
import TooltipIconButton from "../../../components/TooltipIconButton/TooltipIconButton.jsx";
import useIdObject from "../../../components/hooks/useIdObject";
import { supabase } from "../../../supabaseClient.js";
import { useState } from "react";
import { selectLinkById } from "../../Links/linksSlice.js";
import { getLinks } from "../../Links/linksSlice.js";
import {
  getFollowed,
  isFollowing,
  selectFollowedById,
} from "../../followers/followerSlice.js";
import { stringToArray } from "../../../components/constants/formatProfileDatum.js";
import useProfileActions from "../../../components/hooks/useProfileActions.js";

// assumption: passed in data has structure
// isJoin == true: { ...user/project, user_skills:[Tag], user_communities:[Tag], user_interests: [Tag] }
// 2nd assumption: projects have field pid, user has no pid
// where Tag has structure { name: xxx } -> e.g user_skills: [ { name: 'JS'}, { name: 'Acting' } ]
// skills, comm, interests can be retrieved in same query through join

// isJoin == false: { ...user/project, user_skills:"...", user_communities:"...", user_interests: "..."}
// where "..." is null, "", "singleton" or comma separated string

// when inside Links page: it also has additional fields of { pending:Bool, established:Bool, rejected:Bool, s_n: int8}
// where s_n is the link.s_n primary key
// can check if s_n is inside to know if i am inside links page
function ConditionalDisplay(props) {
  const { display, component } = props;
  return display ?  component() : <></>;
}

function ProfileCard({ info, isJoin }) {
  console.log("PROFILE CARD RENDER");
  const dispatch = useDispatch();
  //   console.log(info);
  const isProject = "pid" in info;
  // get link in slice if present
  const linkinSlice = useSelector((state) =>
    selectLinkById(state, isProject ? info.pid : info.id)
  );
  const isLink = linkinSlice != undefined;

  const email = info.email;
  const telegram = info.telegram;

  const idObj = useIdObject();

  // for card actions
  const [loading, setLoading] = useState(false);
  const { LinkButton, FollowButton, RejectButton } = useProfileActions(info, setLoading);


  // TODO: email/tele vis: "afterlink" || "everyone" -> calculate based on if viewing user has linked
  const showEmail = Boolean(info.email) && (info.email_visibility == "everyone" || linkinSlice?.established);
  const showTele = Boolean(info.telegram) && (info.telegram_visibility == "everyone" || linkinSlice?.established)

  const mapName = (d) => d.name; // for join query in links

  // comma sep string to array - for isJoin false
  

  const user_skills = isJoin
    ? info.user_skills.map(mapName)
    : stringToArray(info.user_skills);
  const user_interests = isJoin
    ? info.user_interests.map(mapName)
    : stringToArray(info.user_interests);
  const user_communities = isJoin
    ? info.user_communities.map(mapName)
    : stringToArray(info.user_communities);

  const calculateHide = () => {
    // whether current profile is project
    const currIsProject = "pid" in idObj;

    return (
      (isProject && currIsProject && idObj.pid == info.pid) ||
      (!isProject && !currIsProject && idObj.uid == info.id) ||
      (linkinSlice?.rejected && linkinSlice?.outgoing)
    ); // hide all buttons if rejected,outgoing
  };

  const [hideButtons, setHideButtons] = useState(calculateHide());

  let [showLink, setShowLink] = useState(true);
  let [showFollow, setShowFollow] = useState(true);
  let [showReject, setShowReject] = useState(true);
  // pending, outgoing links: change not for me to a delete button
  const showDelete = isLink && linkinSlice.pending && !linkinSlice.incoming;

  // rejected, outgoing (I sent, and got rejected) -> don't show link and reject btns
  showLink =
    (showLink && !isLink) ||
    (!(linkinSlice?.rejected && !linkinSlice?.incoming) &&
      !linkinSlice?.established);
  showReject = (showReject && !isLink) || linkinSlice?.pending; // only show reject for pending

  // are we following this profile
  const isFollow = useSelector((state) => isFollowing(state, info?.pid));
  // showFollow = showFollow && !isFollow // hide if following this profile

  // check if curr user is following this profile

  // Utility functions

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
        <Email sx={{ mr: 0.7 }} /> {email}
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
          mr: 0,
        }}
      >
        <Telegram sx={{ mr: 0.5 }} /> {telegram}
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

  // Button functions// to insert right fields based on sender / receiver


  // Incoming/Outgoing/You rejected/ They rejected
  function StatusTag() {
    if (!isLink) return <></>;
    if (linkinSlice.established) {
      return (
        <Tag
          color="var(--primary)"
          fontColor={"white"}
          sx={{ fontSize: "0.7rem", alignSelf: "flex-start", mt: 3 }}
        >
          Established
        </Tag>
      );
    }

    if (linkinSlice.pending) {
      return (
        <Tag
          color={linkinSlice.incoming ? "var(--secondary)" : "var(--primary)"}
          fontColor={"white"}
          sx={{ fontSize: "0.7rem", alignSelf: "flex-start", mt: 3 }}
        >
          {linkinSlice.incoming ? "Incoming" : "Outgoing"}
        </Tag>
      );
    }

    if (linkinSlice.rejected) {
      return (
        <Tag
          color={"error.main"}
          fontColor={"white"}
          sx={{ fontSize: "0.7rem", alignSelf: "flex-start", mt: 3 }}
        >
          {linkinSlice.incoming ? "You rejected" : "They rejected"}
        </Tag>
      );
    }

    return <></>;
  }

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
                info={info}
              />
            }
            sx={{ ml: 0 }}
          />

          <StatusTag />
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
            {/* hide buttons if card is self, or if link is established */}

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

              {!loading ? (
                <div
                  style={{
                    display: "inline-flex",
                    gap: "0.4rem",
                    display: hideButtons ? "none" : "",
                  }}
                >

                { LinkButton }
                { FollowButton }
                { RejectButton }
                 
                </div>
              ) : (
                <CircularProgress size={30} />
              )}
            </Stack>

            {/* rejected, incoming (someone else sent, you rejected) -> show rejected text */}
            {/* { (linkinSlice?.rejected && linkinSlice?.incoming) ?  <Tag color="error.main" fontColor="white" sx={{mr:4, mb:0.5}}>Rejected</Tag> : <></> } */}
            {/* Email, Tele */}
            <div style={{ marginLeft: "-8px" }}>
              {emailDisplay()}
              {teleDisplay()}
            </div>
          </CardActions>
        </CardContent>

        {/* <ConditionalDisplay display={true} component={() => <BasicButton bg="primary">Button test</BasicButton>}/> */}
      </Box>

      <Divider orientation="vertical" flexItem />
    </Card>
  );
}

export default ProfileCard;
