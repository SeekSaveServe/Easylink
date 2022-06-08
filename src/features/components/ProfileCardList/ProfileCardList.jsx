import ProfileCard from "../ProfileCard/ProfileCard";
import Scrollable from "../../../components/Scrollable";
import BasicButton from "../../../components/BasicButton";
import { Center } from "@chakra-ui/react";
import { useState } from "react";
import useProfileFilter from "./useProfileFilter";

const map = {
    0: "Users and projects",
    1: "Users Only",
    2: "Projects Only"
};

// filter fn to apply on datum
const filterMap = {
    0: (datum) => true,
    1: (datum) => !datum.isProject,
    2: (datum) => datum.isProject
}

const n = Object.keys(map).length;

// pass in the data through props. This component applies further filter based on Users/Projects
function ProfileCardList({ data }) {
    // const [btnIndex, setBtnIndex] = useState(0);

    // const btnClick = () => {
    //     setBtnIndex((btnIndex + 1) % n);
    // }

    const { FilterButton, btnIndex } = useProfileFilter();

    // TODO: replace with actual data etc
    const showList = (n) => {
        return data.map((datum, idx) => {
            return filterMap[btnIndex](datum) ? <ProfileCard isProject={datum.isProject} info={datum} /> : <></>;
        });
    }

    return (
        <div>
            <Center>
                <FilterButton bg="primary" sx={{margin:"1rem 2rem", width: "20%", display: "block", padding: "0.2rem"}}/>
                {/* <BasicButton 
                    bg="primary" 
                    sx={{margin:"1rem 2rem", width: "20%", display: "block", padding: "0.2rem"}}
                    onClick={btnClick}
                >{map[btnIndex]}</BasicButton> */}
            </Center>

            <Scrollable height="30vh">
                { showList(5) }
            </Scrollable>
        </div>
    )

}

export default ProfileCardList;