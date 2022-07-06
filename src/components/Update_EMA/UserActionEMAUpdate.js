import { supabase } from "../../supabaseClient";

export default function UserActionEMAUpdate(id, isUser, tags) {
  // Constant values, alpha decays the prev value
  const alpha = 0.7;
  const newVal = 0.6;
  const updateValue = async (tag) => {
    // read the value for each tag
    const { data, error } = isUser
      ? await supabase
          .from("ema_score")
          .select("*")
          .match({ uid: id })
          .or(`skill.eq(${tag}),interest.eq(${tag}),community.eq(${tag})`)
      : await supabase
          .from("ema_score")
          .select("*")
          .match({ pid: id })
          .or(`skill.eq(${tag}),interest.eq(${tag}),community.eq(${tag})`);
    // updates the old value
    data.forEach(async (row) => {
      // if tags in the newly interacted row
      if (
        tags[0].includes(row["skill"]) ||
        tags[1].includes(row["interest"]) ||
        tags[2].includes(row)["community"]
      ) {
        await supabase
          .from("ema_score")
          .update({ score: row["score"] * alpha + (1 - alpha) })
          .match({ s_n: row["s_n"] });
      } else {
        await supabase
          .from("ema_score")
          .update({ score: row["score"] * alpha })
          .match({ s_n: row["s_n"] });
      }
    });
  };

  // The following 3 functions adds a new skill / interest / community
  // to the ema table with a score of newVal
  const addNewSkill = async (tag) => {
    // insert with newValue as score
    const { error } = isUser
      ? await supabase
          .from("ema_score")
          .insert([
            {
              uid: id,
              skill: tag,
              score: newVal,
            },
          ])
          .not()
      : await supabase.from("ema_score").insert([
          {
            pid: id,
            skill: tag,
            score: newVal,
          },
        ]);
  };

  const addNewInterest = async (tag) => {
    // insert with newValue as score
    const { error } = isUser
      ? await supabase.from("ema_score").insert([
          {
            uid: id,
            interest: tag,
            score: newVal,
          },
        ])
      : await supabase.from("ema_score").insert([
          {
            pid: id,
            interest: tag,
            score: newVal,
          },
        ]);
  };

  const addNewCommunity = async (tag) => {
    // insert with newValue as score
    const { error } = isUser
      ? await supabase.from("ema_score").insert([
          {
            uid: id,
            community: tag,
            score: newVal,
          },
        ])
      : await supabase.from("ema_score").insert([
          {
            pid: id,
            community: tag,
            score: newVal,
          },
        ]);
  };

  // wrapper function
  const updateTag = async (tag) => {
    // update existing rows belonging to the user
    updateValue(tag);
    // adding new rows that did not exist before
    addNewSkill(tag);
    addNewInterest(tag);
    addNewCommunity(tag);
  };
  tags[0].forEach(updateTag);
  tags[1].forEach(updateTag);
  tags[2].forEach(updateTag);
}
