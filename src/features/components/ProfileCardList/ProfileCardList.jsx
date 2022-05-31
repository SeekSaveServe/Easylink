import ProfileCard from "../ProfileCard/ProfileCard";
import Scrollable from "../../../components/Scrollable";
import BasicButton from "../../../components/BasicButton";
import { Center } from "@chakra-ui/react";
import { useState } from "react";

const map = {
    0: "Users and projects",
    1: "Users Only",
    2: "Projects Only"
};

const n = Object.keys(map).length;

// pass in the data through props. This component applies further filter based on Users/Projects
function ProfileCardList({ data }) {
    const [btnIndex, setBtnIndex] = useState(0);

    const btnClick = () => {
        setBtnIndex((btnIndex + 1) % n);
    }
    // TODO: replace with actual data etc
    const showList = (n) => {
        let arr = [];
        
        for (let i = 0; i < n; i++) {
            arr.push(<ProfileCard isProject={i % 2 == 0}/>);
        }

        return arr;
    }

    return (
        <div>
            <Center>
                <BasicButton 
                    bg="primary" 
                    sx={{margin:"1rem 2rem", width: "20%", display: "block", padding: "0.2rem"}}
                    onClick={btnClick}
                >{map[btnIndex]}</BasicButton>
            </Center>

            <Scrollable>
                { showList(5) }
            </Scrollable>
        </div>
    )

}

export default ProfileCardList;