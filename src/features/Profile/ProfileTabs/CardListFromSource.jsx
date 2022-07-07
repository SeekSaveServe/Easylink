// sourceFn: async function that returns array of users and/or projects
import { useState, useEffect } from "react";
import { CardList } from "../../components/ProfileCardList/ProfileCardList";
import { CircularProgress } from "@mui/material";

// sourceFn: void => Promise<[T ? super User or T ? super Project]>
export default function CardListFromSource({ sourceFn }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    async function getData() {
        setLoading(true);
        
        const users = await sourceFn();
        console.log("Source fn out:", users);
        setLoading(false);
        setData(users);
    }

    useEffect(() => {
      getData();
    }, [])

    return (
        <>
            { loading ? <CircularProgress size={30}/> : <CardList data={data} isJoin={true} btnIndex={0} gutterHeight="55vh"/> }
        </>
    )
}