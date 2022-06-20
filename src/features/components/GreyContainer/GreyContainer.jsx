import { Container } from "@mui/material";
import styles from './GreyContainer.module.css';

function GreyContainer({ children }) {
    return (
        <Container className={styles.parent} maxWidth="lg" sx={{padding:"1rem 6rem !important"}}>
         { children }
      </Container>
    )
}

export default GreyContainer;