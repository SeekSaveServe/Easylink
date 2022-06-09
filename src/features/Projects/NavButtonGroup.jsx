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

    // when you set the navigate state, it does not go away upon refresh, etc.
    // so when navigating from add post -> posts, state: {isProject} sets to false, but 
    // when clicking back to Projects it is still false which causes posts to show upon refresh -> error if proj was deleted but had posts
    // so we need to set isProject true/false each time buttons are clicked
    // but on its own it will not cause the component to re-render -> still need setIsProject
    const navigateIsProject = (isProject) => {
        navigate("/projects", { state: {isProject: isProject} });
        return;
    }

    const projectsClick = () => {
        navigateIsProject(true);
        setIsProject(true);
    }

    const postsClick = () => {
        navigateIsProject(false);
        setIsProject(false);
    }
    return (
        <ButtonGroup variant="outlined" sx={{mb:1}}>
            <Button {...navProps(isProject)} onClick={projectsClick}> Projects</Button>
            <Button {...navProps(!isProject)} onClick={postsClick}>Posts</Button>
        </ButtonGroup>
    );
}

export default NavButtonGroup;