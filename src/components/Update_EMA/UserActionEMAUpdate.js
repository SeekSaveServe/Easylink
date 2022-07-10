import { useState } from "react";
import { supabase } from "../../supabaseClient";

const ALPHA = 0.7; 
const NEW_VALUE = 0.6; 

// match DB column names
const SKILL = 'skill';
const INTEREST = 'interest';
const COMMUNITY = 'community';

const SKILL_INDEX = 0;
const INTEREST_INDEX = 1;
const COMMUNITY_INDEX = 2;

// input: interacting tags array of [[skill], [interest], [community]] strings
// output: array with { tag: skill | interest | community, tag: <string> }
export function formatInteracting(interacting_tags) {
  	const arr = [];

	const addToArr = (tagIndex, tagString) => {
		interacting_tags[tagIndex].forEach((string) => {
			arr.push({
				tag: string,
				type: tagString
			})
		})
	};

	addToArr(SKILL_INDEX, SKILL);
	addToArr(INTEREST_INDEX, INTEREST);
	addToArr(COMMUNITY_INDEX, COMMUNITY);
	return arr;
	
}

// input: ema rows from EMA table corresponding to categories user has interacted with
// output: augmented rows array with tag and type (easy comparison between interacting)
export function formatEMARows(ema_rows) {
	const augmentRow = (row) => {
		let tag = '';
		let type = '';
		const { skill, community, interest } = row;

		if (skill) {
			tag = skill;
			type = SKILL;
		} else if (community) {
			tag = community;
			type = COMMUNITY;
		} else if (interest) {
			tag = interest;
			type = INTEREST
		}

		return { ...row, tag, type }
	}

	return ema_rows.map(augmentRow);
}

// input: row: { tag, type }, array: array of rows
// output: true if a row exists in array with same tag and type
	// There is technically no guarantee of uniqueness across categories e.g 'JS' in both unique_skills and unique_interests
	// If this part gets slow, turn all checks into hash map based
function rowExists(row, array) {
	return array.find(obj => obj.tag == row.tag && obj.type == row.type) != undefined;
}

// tags: [skills, interests, comms]
// update for the clicking user -> useIdObject id
export default async function UserActionEMAUpdate(id, isUser, tags) {
	const matchObj = isUser ? { uid: id } : { pid: id };
	

	// take in array of new rows with tag and type, do one insert
		// tag: actual text
		// type: 'skill' | 'interest' | 'community'
	const addNewRows = async(newRows) => {
		if (newRows.length == 0) return;
		try {
			const { data, error } = supabase
				.from('ema_score')
				.insert(newRows.map(row => {
					return {
						[isUser ? "uid" : "pid"]: id,
						[row.type]: row.tag,
						score: NEW_VALUE
					}
				}))
				.then(val => console.log('add new rows val', val))
				.catch(err => console.log("New rows err", err))
		} catch (error) {
			console.log("Err inserting new rows", error);
		}
	}
	
	
	try {
		
		// get existing EMA rows for this user
		const { data, error } = await supabase
			.from('ema_score')
			.select('*')
			.match(matchObj);

		if(error) throw error;

		// both have an array of objects conforming to { tag:<>. type: <> }
		const interactingTags = formatInteracting(tags);
		const existingEMATags = formatEMARows(data);
		console.log("Interacting", interactingTags);
		console.log("Existing", existingEMATags);

		// for each existing EMA row: if interacting tags has, no-decay update. else, decay update
		existingEMATags.forEach((row) => {
			if (rowExists(row, interactingTags)) {
				// no decay / less decay
				 supabase
					.from("ema_score")
					.update({ score: row["score"] * ALPHA + (1 - ALPHA) })
					.match({ s_n: row["s_n"] })
					.then(val => console.log("no-decay succ", val))
					.catch(err => console.log("no-decay err", err))
			} else {
				supabase
					.from("ema_score")
					.update({ score: row["score"] * ALPHA })
					.match({ s_n: row["s_n"] })
					.then(val => console.log("decay-succ", val))
					.catch(err => console.log("decay-err", err))
			}
		});

		// for each interacting tag: if not in existing, add new
		addNewRows(
			interactingTags.filter(row => !rowExists(row, existingEMATags))
		)


	} catch (error) {
		console.log("Err updating EMA", error)
	}
  

  // Constant values, alpha decays the prev value
  // const alpha = 0.7;
  // const newVal = 0.6;
  // const existingTags = [];

  // const updateValue = async (tag) => {
  //   // read the value for each tag
  //   const { data, error } = isUser
  //     ? await supabase
  //         .from("ema_score")
  //         .select("*")
  //         .match({ uid: id })
  //         .or(`skill.eq${tag},interest.eq${tag},community.eq${tag}`)
  //     : await supabase
  //         .from("ema_score")
  //         .select("*")
  //         .match({ pid: id })
  //         .or(`skill.eq${tag},interest.eq${tag},community.eq${tag}`);
  //   // updates the old value
  //   data.forEach(async (row) => {
  //     // store existing tags
  //     if (row["skill"]) {
  //       existingTags.push(row["skill"]);
  //     } else if (row["interest"]) {
  //       existingTags.push(row["interest"]);
  //     } else {
  //       existingTags.push(row["community"]);
  //     }

  //     // if tags in the newly interacted row
  //     if (
  //       tags[0].includes(row["skill"]) ||
  //       tags[1].includes(row["interest"]) ||
  //       tags[2].includes(row)["community"]
  //     ) {
        // await supabase
        //   .from("ema_score")
        //   .update({ score: row["score"] * alpha + (1 - alpha) })
        //   .match({ s_n: row["s_n"] });
  //     } else {
  //       await supabase
  //         .from("ema_score")
  //         .update({ score: row["score"] * alpha })
  //         .match({ s_n: row["s_n"] });
  //     }
  //   });
  // };

  // // The following 3 functions adds a new skill / interest / community
  // // to the ema table with a score of newVal
  // const addNewSkill = async (tag) => {
  //   if (!existingTags.includes(tag)) {
  //     // insert with newValue as score
  //     const { error } = isUser
  //       ? await supabase.from("ema_score").insert([
  //           {
  //             uid: id,
  //             skill: tag,
  //             score: newVal,
  //           },
  //         ])
  //       : await supabase.from("ema_score").insert([
  //           {
  //             pid: id,
  //             skill: tag,
  //             score: newVal,
  //           },
  //         ]);
  //   }
  // };

  // const addNewInterest = async (tag) => {
  //   if (!existingTags.includes(tag)) {
  //     // insert with newValue as score
  //     const { error } = isUser
  //       ? await supabase.from("ema_score").insert([
  //           {
  //             uid: id,
  //             interest: tag,
  //             score: newVal,
  //           },
  //         ])
  //       : await supabase.from("ema_score").insert([
  //           {
  //             pid: id,
  //             interest: tag,
  //             score: newVal,
  //           },
  //         ]);
  //   }
  // };

  // const addNewCommunity = async (tag) => {
  //   if (!existingTags.includes(tag)) {
  //     // insert with newValue as score
  //     const { error } = isUser
  //       ? await supabase.from("ema_score").insert([
  //           {
  //             uid: id,
  //             community: tag,
  //             score: newVal,
  //           },
  //         ])
  //       : await supabase.from("ema_score").insert([
  //           {
  //             pid: id,
  //             community: tag,
  //             score: newVal,
  //           },
  //         ]);
  //   }
  // };

  // // wrapper function
  // const updateTag = async (tag) => {
  //   // update existing rows belonging to the user
  //   updateValue(tag);
  //   // adding new rows that did not exist before
  //   addNewSkill(tag);
  //   addNewInterest(tag);
  //   addNewCommunity(tag);
  // };
  // tags[0].forEach(updateTag);
  // tags[1].forEach(updateTag);
  // tags[2].forEach(updateTag);
}
