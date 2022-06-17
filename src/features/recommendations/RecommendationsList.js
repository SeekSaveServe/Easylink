import { Box, Typography, Card, CardContent, CardHeader, Stack } from "@mui/material";
import styles from './Recommendations.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import ProfileCardList from "../components/ProfileCardList";
import { fakeLinksData } from "../Links/Links";
import { Center } from "@chakra-ui/react";
import useProfileFilter from "../components/ProfileCardList/useProfileFilter";
import { CardList } from "../components/ProfileCardList/ProfileCardList";
import { supabase } from "../../supabaseClient";
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';

// For use specifically in Feed: pull from recommender API
function RecommendationsList({ filterIndex }) {
    // const { FilterButton, btnIndex } = useProfileFilter();
    
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    // eventually replace with generated from API - ensure isProject field is available or computable (pid?)
    // for now, get all projects + users and preprocess by adding isProject field 
    async function getRecommendations() {
        setLoading(true);
        try {
            const { data:projects, error } = await supabase 
                .from('projects')
                .select(`
                *,
                user_skills (
                    name
                ),
                user_interests(
                    name
                ),
                user_communities!fk_pid(
                    name
                )
                `)

            if (error) throw error;

            const { data:users, error:userErr } = await supabase
                    .from('users')
                    .select(`
                    *,
                    user_skills (
                        name
                    ),
                    user_interests(
                        name
                    ),
                    user_communities(
                        name
                    )
                    `)
                    .limit()
                    .order('created_at', { ascending: false })

            if (error) throw error;
            
            const valid = (datum) => {
                return datum.user_skills.length > 0 && datum.user_interests.length > 0 
            }
            
            setRecommendations(users.concat(projects)
                .filter(valid)
                .sort( (i1,i2) => new Date(i2.created_at) - new Date(i1.created_at) )
            );


            
        } catch (error) {
            console.log("reccs err", error)
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        getRecommendations();
        
    }, [])

    function displayRecommendations() {
        if (loading) {
            return <Center><CircularProgress size={40} sx={{mt:2}}/></Center>;
        }

        if (recommendations.length == 0) {
            return (
                <Center>
                    <Typography color="gray" variant="h6" sx={{fontWeight:"normal", mt:1}}> Nothing to show </Typography>
                </Center>
            )
        }

        return <CardList data={recommendations} btnIndex={filterIndex} isJoin={true}/>;

    }

    return (
        <Box>
            {/* <Center style={{marginBottom:6}}>
                <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
                <FilterButton bg="primary" sx={{margin:"0rem 2rem", width: "20%", display: "block", padding: "0.2rem"}}/>
            </Center> */}
            
            { displayRecommendations() }
        </Box>
    )

}

export default RecommendationsList;