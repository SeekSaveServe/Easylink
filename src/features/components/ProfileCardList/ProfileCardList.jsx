import ProfileCard from "../ProfileCard/ProfileCard";
import Scrollable from "../../../components/Scrollable";


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
        <Scrollable>
            { showList(5) }
        </Scrollable>
    )

}

export default ProfileCardList;