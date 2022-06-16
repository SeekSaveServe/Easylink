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

    const [loading, setLoading] = useState(false);

    // for some reason, fetching reaction status inside post and passing as prop doesn't work 
        // it passes the prop down correctly but somehow fails to set
    async function fetchReactionStatus() {
        // maybeSingle modifier constantly gives errors, I'm forced to not use it
        try {
            setLoading(true);
            const { data: reactionsData, error } = await supabase
                .from('post_reactions')
                .select('reaction1,reaction2,reaction3')
                .match({
                    ...idObj,
                    post_id: postId
                })
                
            
            if (error) throw error;
            
            
            const reaction = reactionsData.length > 0 ? reactionsData[0]?.[name] : undefined;
            if (!reaction) {
                setLoading(false);
                return;
            };

            setSelected(reaction);
            setLoading(false);
        } catch (error) {
            console.log("reaction err", error);
        } finally {
            setLoading(false);
        }
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
        setLoading(true);
        try {

            // 1. Insert the row if not there
            const matchObj = {
                ...idObj,
                post_id: postId,
            }

            const { data, error, count } = await supabase
                .from('post_reactions')
                .select('s_n', { count: 'exact', head: true } )
                .match(matchObj);

            if (error) throw error;
            

            // 1a.doesn't exist, do insert
            if (count == 0) {
                const { data, error } = await supabase
                    .from('post_reactions')
                    .insert([
                        { ...matchObj, [name]:true }
                    ]);
                
                if (error) throw error;

            } 

            // 2. call rpc increment
            const { error:rpcErr } = await supabase
                .rpc('inc_reaction', { 
                    col_name: name,
                    post_id: postId,
                    pid: "pid" in idObj ? idObj["pid"] : null,
                    uid: "uid" in idObj ? idObj["uid"] : null
                })
            
            if (rpcErr) throw rpcErr;
            
            
            
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    // call rpc('decrement')
    async function decrement() {
        setLoading(true);

        try {
            const { error } = await supabase
                .rpc('dec_reaction', { 
                    col_name: name,
                    post_id: postId,
                    pid: "pid" in idObj ? idObj["pid"] : null,
                    uid: "uid" in idObj ? idObj["uid"] : null
                });
            
            if (error) throw error;
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    // if not selected: increment. if selected: decrement
    // do optimistic updates: just increase/decrease the num, no need fetch real number first
        // why: e.g it's at 0 -> click -> goes to 2 -> kind of weird (unlike poll where res was hidden first)
    const click = async() => {
        if (disabled || loading) return;
        if (!selected) {
            setNumber(number + 1);
            await increment();
            
        } else {
            setNumber(number - 1);
            await decrement();
            
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