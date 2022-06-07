import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react";
import styles from './Emoji.module.css';

export default function EmojiButton({ label, symbol }) {
    const [selected, setSelected] = useState(false);
    const [number, setNumber] = useState(0);

    const click = () => {
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