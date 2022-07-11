import { supabase } from "../../supabaseClient";

export default async function ProfileEMAUpdate(
  id,
  isUser,
  originalTags,
  newTags
) {
  const checkOriginalSkill = async (tag) => {
    if (!newTags.includes(tag)) {
      // delete tag
      if (!newTags[0].includes(tag)) {
        // insert tag with value of 1
        const { error } = isUser
          ? await supabase
              .from("ema_score")
              .delete()
              .match({ uid: id, skill: tag })
          : await supabase
              .from("ema_score")
              .delete()
              .match({ pid: id, skill: tag });
      }
    }
  };

  const checkOriginalInterest = async (tag) => {
    if (!newTags.includes(tag)) {
      // delete tag
      if (!newTags[1].includes(tag)) {
        // insert tag with value of 1
        const { error } = isUser
          ? await supabase
              .from("ema_score")
              .delete()
              .match({ uid: id, interest: tag })
          : await supabase
              .from("ema_score")
              .delete()
              .match({ pid: id, interest: tag });
      }
    }
  };

  const checkOriginalCommunity = async (tag) => {
    if (!newTags.includes(tag)) {
      // delete tag
      if (!newTags[2].includes(tag)) {
        // insert tag with value of 1
        const { error } = isUser
          ? await supabase
              .from("ema_score")
              .delete()
              .match({ uid: id, community: tag })
          : await supabase
              .from("ema_score")
              .delete()
              .match({ pid: id, community: tag });
      }
    }
  };

  const checkNewSkill = async (tag) => {
    if (!originalTags[0].includes(tag)) {
      // insert tag with value of 1
      const { error } = isUser
        ? await supabase.from("ema_score").insert([
            {
              uid: id,
              skill: tag,
              score: 1,
            },
          ])
        : await supabase.from("ema_score").insert([
            {
              pid: id,
              skill: tag,
              score: 1,
            },
          ]);
    }
  };

  const checkNewInterest = async (tag) => {
    if (!originalTags[1].includes(tag)) {
      // insert tag with value of 1
      const { error } = isUser
        ? await supabase.from("ema_score").insert([
            {
              uid: id,
              interest: tag,
              score: 1,
            },
          ])
        : await supabase.from("ema_score").insert([
            {
              pid: id,
              interest: tag,
              score: 1,
            },
          ]);
    }
  };

  const checkNewCommunity = async (tag) => {
    if (!originalTags[2].includes(tag)) {
      // insert tag with value of 1
      const { error } = isUser
        ? await supabase.from("ema_score").insert([
            {
              uid: id,
              community: tag,
              score: 1,
            },
          ])
        : await supabase.from("ema_score").insert([
            {
              pid: id,
              community: tag,
              score: 1,
            },
          ]);
    }
  };
  console.log("trying");
  console.log(originalTags);
  console.log(newTags);
  originalTags[0].forEach(checkOriginalSkill);
  originalTags[1].forEach(checkOriginalInterest);
  originalTags[2].forEach(checkOriginalCommunity);
  newTags[0].forEach(checkNewSkill);
  newTags[1].forEach(checkNewInterest);
  newTags[2].forEach(checkNewCommunity);
}
