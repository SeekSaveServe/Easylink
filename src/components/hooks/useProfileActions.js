// hook to re-use link, follow, reject actions
import { useSelector } from "react-redux";
import { selectLinkById } from "../../features/Links/linksSlice";
import useIdObject from "./useIdObject";
import { useDispatch } from "react-redux";
import { supabase } from "../../supabaseClient";
import { getLinks } from "../../features/Links/linksSlice";
import { isFollowing, selectFollowedById, getFollowed } from "../../features/followers/followerSlice";

function useProfileActions(info, setLoading) {
    const isProject = "pid" in info;
    const linkinSlice = useSelector((state) =>
    selectLinkById(state, isProject ? info.pid : info.id)
  );

    const idObj = useIdObject();
    const dispatch = useDispatch();

    const isLink = linkinSlice != undefined;

    const isFollow = useSelector((state) => isFollowing(state, info?.pid));
    const followedObj = useSelector((state) =>
    selectFollowedById(state, info?.pid)
  );

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
    const addLink = async () => {
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
      const rejectLink = async () => {
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
      const follow = async () => {
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

      return {
        link:addLink,
        reject:rejectLink,
        followProfile: follow
      }

}

export default useProfileActions;