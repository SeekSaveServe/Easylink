// sourceFn: async function that returns array of users and/or projects
import { useState, useEffect } from "react";
import { CardList } from "../../components/ProfileCardList/ProfileCardList";
import { CircularProgress } from "@mui/material";
import { PostsDisplay } from "../../posts/PostsDisplay";
import { Center } from "@chakra-ui/react";

// take in an async sourceFn: Promise<[data]>, and a List component with a data prop then handle loading and fetching
    // can re-use for both Posts and ProfileCards
export function ListFromSource({ sourceFn, List }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    async function getData() {
        setLoading(true);
        
        const users = await sourceFn();
        setLoading(false);
        setData(users);
    }

    useEffect(() => {
      getData();
    }, [sourceFn])

    return (
        <>
            { loading ? <Center><CircularProgress size={30}/></Center> : <List data={data}/> }
        </>
    )
}

// sourceFn: void => Promise<[T ? super User or T ? super Project]>
export function CardListFromSource({ sourceFn }) {
    const CurriedProfileList = ({ data }) => <CardList data={data} isJoin={true} btnIndex="0" gutterHeight="50vh"/>;
    return <ListFromSource sourceFn={sourceFn} List={CurriedProfileList}/>
}

export function PostListFromSource({ sourceFn }) {
    const CurriedPostList = ({ data }) => <PostsDisplay data={data} filterIndex={0} gutterHeight="55vh"/>;
    return <ListFromSource sourceFn={sourceFn} List={CurriedPostList}/>
}


