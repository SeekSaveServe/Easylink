// hook to re-use link, follow, reject actions
import { useSelector } from "react-redux";
import { selectLinkById } from "../../features/Links/linksSlice";
import useIdObject from "./useIdObject";
import { useDispatch } from "react-redux";
import { supabase } from "../../supabaseClient";
import { getLinks } from "../../features/Links/linksSlice";
import { isFollowing, selectFollowedById, getFollowed } from "../../features/followers/followerSlice";
import TooltipIconButton from "../TooltipIconButton/TooltipIconButton";
import { AddLinkOutlined, LeakRemoveOutlined, RssFeedOutlined, DeleteOutlined, CancelOutlined } from "@mui/icons-material";


function ConditionalDisplay(props) {
    const { display, component } = props;
    return display ? component : <></>;
}

function useProfileActions(info, setLoading) {
    const isProject = "pid" in info;
    const linkinSlice = useSelector((state) =>
    selectLinkById(state, isProject ? info.pid : info.id)
  );

    const idObj = useIdObject();
    const dispatch = useDispatch();

    const isLink = linkinSlice != undefined;

    const isFollow = useSelector((state) => isFollowing(state, info?.pid)); // am I following this profile
    const followedObj = useSelector((state) =>
      selectFollowedById(state, info?.pid)
    ); // corresponding row in followers table for this profile (if we are following them) or undefined

    // TODO bug: might show link button at first when isLink is true due to undefined (haven't loaded) 
        // make false when links is still loading
    const showDelete = isLink && linkinSlice.pending && !linkinSlice.incoming;

    // rejected, outgoing (I sent, and got rejected) -> don't show link and reject btns
    // also don't show link for established
    const showLink = (!isLink) || (!(linkinSlice?.rejected && !linkinSlice?.incoming) &&
        !linkinSlice?.established);

    const showReject = (!isLink) || linkinSlice?.pending; // only show reject for pending or when not in links at all


            // to insert right fields based on sender / receiver
    const matchObj = {
        ["uid" in idObj ? "uid_sender" : "pid_sender"]:
            "uid" in idObj ? idObj.uid : idObj.pid,
        [isProject ? "pid_receiver" : "uid_receiver"]: isProject
            ? info.pid
            : info.id,
        ["uid" in idObj ? "pid_sender" : "uid_sender"]: null,
        [isProject ? "uid_receiver" : "pid_receiver"]: null,
        };

    const outgoingObj = matchObj; // sender = me, receiver = other party

            // incoming: set uid_sender/pid_sender to null
    const incomingObj = {
        [isProject ? "pid_sender" : "uid_sender"]: isProject ? info.pid : info.id,
        ["uid" in idObj ? "uid_receiver" : "pid_receiver"]:
            "uid" in idObj ? idObj.uid : idObj.pid,
        [isProject ? "uid_sender" : "pid_sender"]: null,
        ["uid" in idObj ? "pid_receiver" : "uid_receiver"]: null,
        }; // sender = other, receiver = me


    // Functions

    // Link button
    const link = async () => {
        try {
        //   setLoading(true);
          // cases: exists inside links (e.g rejected) vs doesn't exist inside links
    
          // do insert
          if (!isLink) {
            const { data, error } = await supabase.from("links").insert([
              {
                ...matchObj,
                accepted: false,
                rejected: false,
              },
            ]);
    
            if (error) throw error;
            // console.log("Link succ", data);
          } else {
            // if rejected, incoming -> change to pending, outgoing
            // because rejected, incoming could be either: they sent a req, I rejected OR I rejected without any pending
            // so easier to default to pending, outgoing
            if (linkinSlice.rejected && linkinSlice.incoming) {
              const { data: updateData, error: updateErr } = await supabase
                .from("links")
                .update({ accepted: false, rejected: false, ...outgoingObj })
                .match({ s_n: linkinSlice.s_n });
    
              if (updateErr) throw updateErr;
              console.log("Link update succ (rejected, incoming", updateData);
            } else {
              // is definitely pending, incoming: hide link for pendig, outgoing + established + rejected, outgoing
              const { data: updateData, error: updateErr } = await supabase
                .from("links")
                .update({ accepted: true, rejected: false })
                .match({ s_n: linkinSlice.s_n });
    
              if (updateErr) throw updateErr;
              console.log("Link update succ", updateData);
            }
          }
    
        //   dispatch(getLinks(idObj));
        } catch (error) {
          console.log("Link err", error);
        } finally {
          //setLoading(false);
        }
      };


        // Reject
            // for reject/delete
            // not in links:
            // - insert row with accepted=false, rej = true, dispatch getLinks
            // inside links:
            // - pending, incoming: update row to acc=false, rej=true, dispatch getLinks
            // - pending, outgoing: delete the row from links table completely (cancel the link req)
      const reject = async () => {
        try {
        //   setLoading(true);
          // I reject off the bat: rejected, incoming
          if (!isLink) {
            const { data: insData, error: insError } = await supabase
              .from("links")
              .insert([
                {
                  ...incomingObj,
                  accepted: false,
                  rejected: true,
                },
              ]);
    
            if (insError) throw insError;
            console.log("Reject succ (ins):", insData);
    
            // setShowLink(false);
            // setShowReject(false);
          } else {
    
            // definitely pending: pending, incoming -> rejected, incoming
            if (linkinSlice.incoming) {
              const { data: updateData, error: updateErr } = await supabase
                .from("links")
                .update({ accepted: false, rejected: true })
                .match({ s_n: linkinSlice.s_n });
    
              if (updateErr) throw updateErr;
              console.log("Update rej succ", updateData);
            } else {
              // delete the link (pending, outgoing)
              const { data: delData, error: delErr } = await supabase
                .from("links")
                .delete()
                .match({ s_n: linkinSlice.s_n });
    
              if (delErr) throw delErr;
              console.log("Del after rej succ", delData);
            }
          }
    
        //   dispatch(getLinks(idObj));
        } catch (error) {
          console.log("Reject err:", error);
        } finally {
        //   setLoading(false);
        }
      };

      // Follow
      const followProject = async () => {
        try {
        //   setLoading(true);
            // unfollow
          if (isFollow) {
            
            const { data, error } = await supabase
              .from("followers")
              .delete()
              .match({
                s_n: followedObj.s_n,
              });
    
            if (error) throw error;
          } else {
            const { data, error } = await supabase.from("followers").insert([
              {
                ["uid" in idObj ? "follower_uid" : "follower_pid"]:
                  "uid" in idObj ? idObj.uid : idObj.pid,
                followed_pid: info.pid,
              },
            ]);
    
            if (error) throw error;
          }
    
        //   dispatch(getFollowed(idObj));
        } catch (error) {
          console.log("Follow err", error);
        } finally {
        //   setLoading(false);
        }
      };

      const loadingDecorator = (fn, dispatchFn) => {
        async function decorated() {
          setLoading(true);
          await fn();
          setLoading(false);
          dispatchFn();
        }
    
        return decorated;
      }
    
      const linksDispatch = () => dispatch(getLinks(idObj));
      const followedDispatch = () => dispatch(getFollowed(idObj));

      const addLink = loadingDecorator(link, linksDispatch);
      const rejectLink = loadingDecorator(reject, linksDispatch);
      const follow = loadingDecorator(followProject, followedDispatch);        

      // Buttons
      const LinkButton = <ConditionalDisplay 
        display={showLink && !showDelete}
        component={
            <TooltipIconButton
            icon={
            <AddLinkOutlined
                color="primary"
                sx={{ fontSize: 30 }}
            />
            }
            title="Link"
            onClick={addLink}
            />
        }
        />;
      
      const FollowButton = <ConditionalDisplay 
        display={isProject}
        component={
            <TooltipIconButton
                icon={
                isFollow ? (
                    <LeakRemoveOutlined
                    sx={{ color: "var(--secondary)", fontSize: 30 }}
                    />
                ) : (
                    <RssFeedOutlined
                    sx={{ color: "var(--secondary)", fontSize: 30 }}
                    />
                )
                }
                title={isFollow ? "Unfollow" : "Follow"}
                onClick={follow}
            />
        }
        />;
       
       const RejectButton = <ConditionalDisplay 
        display={showReject}
        component={
            <TooltipIconButton
                icon={
                showDelete ? (
                    <DeleteOutlined
                    sx={{ fontSize: 30, color: "error.main" }}
                    />
                ) : (
                    <CancelOutlined
                    sx={{ fontSize: 30, color: "error.main" }}
                    />
                )
                }
                title={showDelete ? "Delete" : "Not for me"}
                onClick={rejectLink}
            />
        }
       />;


    //   const LinkButton = () => 
        // showLink && !showDelete ?<TooltipIconButton
        //     icon={
        //     <AddLinkOutlined
        //         color="primary"
        //         sx={{ fontSize: 30 }}
        //     />
        //     }
        //     title="Link"
        //     onClick={addLink}
        // />

    //   const FollowButton = () => 

    //   return {
    //     addLink,
    //     rejectLink,
    //     follow
    //   }

    return {
        LinkButton,
        FollowButton,
        RejectButton
    }

}

function useProfileActionButtons(info, setLoading) {

}

export default useProfileActions;

// Link

 {/* {showLink && !showDelete ? (
                    <TooltipIconButton
                      icon={
                        <AddLinkOutlined
                          color="primary"
                          sx={{ fontSize: 30 }}
                        />
                      }
                      title="Link"
                      onClick={addLink}
                    />
                  ) : (
                    <></>
                  )} */}


// Follow
{/* {isProject && showFollow ? (
<TooltipIconButton
    icon={
    isFollow ? (
        <LeakRemoveOutlined
        sx={{ color: "var(--secondary)", fontSize: 30 }}
        />
    ) : (
        <RssFeedOutlined
        sx={{ color: "var(--secondary)", fontSize: 30 }}
        />
    )
    }
    title={isFollow ? "Unfollow" : "Follow"}
    onClick={follow}
/>
) : (
<></>
)} */}

// Reject/Delete

{/* {showReject ? (
<TooltipIconButton
    icon={
    showDelete ? (
        <DeleteOutlined
        sx={{ fontSize: 30, color: "error.main" }}
        />
    ) : (
        <CancelOutlined
        sx={{ fontSize: 30, color: "error.main" }}
        />
    )
    }
    title={showDelete ? "Delete" : "Not for me"}
    onClick={rejectLink}
/>
) : (
<></>
)} */}