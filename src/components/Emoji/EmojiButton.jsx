import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react";
import styles from './Emoji.module.css';

// disabled: if disabled on click doesn't work -> for project that owns the post
// name: reaction1 || reaction2 || reaction3 -> for making the queries
export default function EmojiButton({ label, symbol, disabled, name, startNumber, startSelected }) {
    const [selected, setSelected] = useState(startSelected);
    const [number, setNumber] = useState(startNumber);

    const click = () => {
        if (disabled) return;
        if (!selected) {
            setNumber(number + 1);
        } else {
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