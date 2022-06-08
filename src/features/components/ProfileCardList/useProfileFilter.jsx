import { useState } from "react";
import BasicButton from "../../../components/BasicButton";

const map = {
    0: "Users and projects",
    1: "Users Only",
    2: "Projects Only"
};

export default function useProfileFilter() {
    const [btnIndex, setBtnIndex] = useState(0);

    const btnClick = () => {
        setBtnIndex((btnIndex + 1) % 3);
    }

    return {
        FilterButton: (props) => <BasicButton {...props} onClick={btnClick}>{map[btnIndex]}</BasicButton>,
        btnIndex
    }

}