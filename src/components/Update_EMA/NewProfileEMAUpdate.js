import { supabase } from "../../supabaseClient";

// newTags = [[...skills], [interests...], [...communities]]
export default function NewProfileEMAUpdate(id, isUser, newTags) {
  const updateEMASkill = async (tag) => {
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
  };

  const updateEMAInterest = async (tag) => {
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
  };

  const updateEMACommunity = async (tag) => {
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
  };
  console.log(newTags);
  newTags[0].forEach(updateEMASkill);
  newTags[1].forEach(updateEMAInterest);
  newTags[2].forEach(updateEMACommunity);
}
