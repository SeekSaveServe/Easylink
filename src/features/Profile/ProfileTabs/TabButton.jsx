import { Button } from "@mui/material"

// Tab Button for ProfileTabs
    // selected: currently selected index
    // setSelected: function to set the currently selected index
    // index: index corresponding to this tab
    // children: to put inside Button
export default function TabButton({ selected, setSelected, index, children }) {
    return (
        <Button sx={{
            backgroundColor: selected == index ? "white" : "var(--bg-grey)",
            color: "black",
            borderColor: "var(--primary)"
            
        }} 
        onClick={(evt) => setSelected(index)}
        >
            { children }
        </Button>
    )
}