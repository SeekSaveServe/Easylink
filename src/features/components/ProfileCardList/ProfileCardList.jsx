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
    1: (datum) => !("pid" in datum),
    2: (datum) => "pid" in datum
}

const n = Object.keys(map).length;

// pass in the data through props. This component applies further filter based on Users/Projects
// without button
// btnIndex indicates filter to apply
export function CardList({ data, btnIndex }) {

    // TODO: replace with actual data etc
    const showList = () => {
        return data.map((datum, idx) => {
            return filterMap[btnIndex](datum) ? <ProfileCard key={idx} info={datum} /> : <></>;
        });
    }

    return (
        <div>
            <Scrollable height="30vh">
                { showList() }
            </Scrollable>
        </div>
    )

}

// with button - this component exists because was previously written as ProfileCardList for a few pages -> don't want to interrupt those imports
function ProfileCardList({ data }) {
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
            </Center>

            <CardList data={data} btnIndex={btnIndex}/>
        </div>
    )
}

export default ProfileCardList;