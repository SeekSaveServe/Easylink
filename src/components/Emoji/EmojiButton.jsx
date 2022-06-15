import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import useIdObject from "../hooks/useIdObject";
import styles from './Emoji.module.css';
import { supabase } from "../../supabaseClient";

// disabled: if disabled on click doesn't work -> for project that owns the post
// name: reaction1 || reaction2 || reaction3 -> for making the queries
export default function EmojiButton({ postId, label, symbol, disabled, name, startNumber }) {    
    const [selected, setSelected] = useState(false);
    const [number, setNumber] = useState(startNumber);
    const idObj = useIdObject(); // { pid } or { uid }

    // for some reason, fetching reaction status inside post and passing as prop doesn't work 
        // it passes the prop down correctly but somehow fails to set
    async function fetchReactionStatus() {
        // maybeSingle modifier constantly gives errors, I'm forced to not use it
        const { data: reactionsData, error } = await supabase
            .from('post_reactions')
            .select('reaction1,reaction2,reaction3')
            .match({
                ...idObj,
                post_id: postId
            })
            
        
        if (error) throw error;
        
        
        const reaction = reactionsData.length > 0 ? reactionsData[0]?.[name] : undefined;
        if (!reaction) return;
        setSelected(reaction);
    }

    useEffect(() => {
        fetchReactionStatus();
    }, [])

    // create row in post_reactions if not exists. then, call rpc('increment')
    // {
    //     ...idObj,
    //     post_id: postId,
    //     [name]: true
    // }

    async function increment() {
        try {
            console.log("Increment");

            // the identifying information to insert/ update with
            const matchObj = {
                ...idObj,
                post_id: postId,
            }

            const { data, error, count } = await supabase
                .from('post_reactions')
                .select('s_n', { count: 'exact', head: true } )
                .match(matchObj);

            if (error) throw error;
            console.log("Data from incr", count)
            
            

            // doesn't exist, do insert
            if (count == 0) {
                const { data, error } = await supabase
                    .from('post_reactions')
                    .insert([
                        { ...matchObj, [name]:true }
                    ]);
                
                if (error) throw error;
                console.log("Insert success", data);

            } else {
                // exists: do update
                const { data, error } = await supabase
                    .from('post_reactions')
                    .update({ [name]: true })
                    .match(matchObj);
                if (error) throw error;
                console.log("Update success", data)
            }

        } catch (error) {
            throw error;
        } 
    }

    // call rpc('decrement')
    async function decrement() {
        console.log("Decrement")
    }

    // if not selected: increment. if selected: decrement
    // do optimistic updates: just increase/decrease the num, no need fetch real number first
        // why: e.g it's at 0 -> click -> goes to 2 -> kind of weird (unlike poll where res was hidden first)
    const click = async() => {
        if (disabled) return;
        if (!selected) {
            await increment();
            setNumber(number + 1);
        } else {
            await decrement();
            setNumber(number - 1);
        }

        setSelected(!selected);
    }

    return (
        <Box className={styles.box} onClick={click}>
            <span
            className={selected ? styles.selected : styles.emoji}
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
            style={{fontSize:"1.3rem"}}
            >
                {symbol}
            <span className={`${styles.number}`}>{number}</span>
            </span>
        </Box>
    )
}