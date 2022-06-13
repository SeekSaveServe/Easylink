// nest children inside child div. apply styles to outer Box (sx)
import { Box } from '@mui/system';
import scroll from '../../features/components/scroll/Scroll.module.css';

// height: set height for gutter hidden space
function Scrollable({sx, height, children}) {
    return (
        <Box sx={sx} className={scroll.scroll_parent}>
            <Box className={scroll.scroll_child}>
                {children}
                <div style={{visibility: "hidden", height: height ? height : "25vh"} }>
                </div>
            </Box>
        </Box>

    )
}

export default Scrollable;