import { Box } from "@mui/system";
import ProfileCard from "../ProfileCard/ProfileCard";
import styles from './ProfileCardList.module.css';
import scroll from '../../components/scroll/Scroll.module.css';


function ProfileCardList() {
    // TODO: replace with actual data etc
    const showList = (n) => {
        let arr = [];
        
        for (let i = 0; i < n; i++) {
            arr.push(<ProfileCard isProject={i % 2 == 0}/>);
        }

        return arr;
    }

    return (
        <Box className={scroll.scroll_child}>
            { showList(5) }
            {/* To add space for scrolling to last post */}
            <div style={{visibility: "hidden", height: "10vh"}}>
            </div>
        </Box>
    )

}

export default ProfileCardList;