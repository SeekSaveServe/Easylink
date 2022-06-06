import { ButtonGroup, Button } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

// for use in projects/posts 
function NavButtonGroup({ isProject, setIsProject }) {
    const location = useLocation();
    const navigate = useNavigate();

    const navProps = (isActive) => {
        const variantObj = (isActive) ? {
            variant: "contained"
        } : {}

        return {
            ...variantObj
        }
    }

    return (
        <ButtonGroup variant="outlined" sx={{mb:1}}>
            <Button {...navProps(isProject)} onClick={() => setIsProject(true)}> Projects</Button>
            <Button {...navProps(!isProject)} onClick={() => setIsProject(false)}>Posts</Button>
        </ButtonGroup>
    );
}

export default NavButtonGroup;