import { ButtonGroup, Button } from "@mui/material";
import { useLocation } from 'react-router-dom';

function NavButtonGroup() {
    const location = useLocation();

    const navProps = (url) => {
        const variantObj = (location.pathname == url) ? {
            variant: "contained"
        } : {}

        return {
            ...variantObj
        }
    }

    return (
        <ButtonGroup variant="outlined" sx={{mb:1}}>
            <Button {...navProps("/projects")}> Projects</Button>
            <Button {...navProps("/posts")}>Posts</Button>
        </ButtonGroup>
    );
}

export default NavButtonGroup;