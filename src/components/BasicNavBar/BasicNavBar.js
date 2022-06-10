import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../supabaseClient";
import BasicButton from "../BasicButton";
import LinkableAvatar from "../LinkableAvatar.js";
import BasicSearchBar from "../BasicSearchBar/BasicSearchBar";
import { replace } from "../../features/user/userSlice";


export default function BasicNavBar() {
  const userProfile = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const signOut = async () => {
    sessionStorage.removeItem("currProject"); 
    dispatch(replace({})); // clear userSlice so it doesn't pre-fill signup
    await supabase.auth.signOut();
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "var(--primary)" }}>
      <AppBar position="static" sx={{ backgroundColor: "var(--primary)" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Easylink
          </Typography>

          <Box sx={{ flexGrow: 0.1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <LinkableAvatar src={userProfile.avatar_url} />
          </Box>

          <Box sx={{ flexGrow: 0.05 }} />
          <NavLink
            to="/feed"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "white",
                  }
                : { color: "black" }
            }
          >
            Feed
          </NavLink>

          <Box sx={{ flexGrow: 0.05 }} />
          <NavLink
            to="/projects"
            style={({ isActive }) =>
              (isActive || ["/addproject", "/addpost"].includes(location.pathname))
                ? {
                    color: "white",
                  }
                : { color: "black" }
            }
          >
            Projects
          </NavLink>

          <Box sx={{ flexGrow: 0.05 }} />
          <NavLink
            to="/links"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "white",
                  }
                : { color: "black" }
            }
          >
            Links
          </NavLink>

          <Box sx={{ flexGrow: 1, backgroundColor: "var(--primary)" }} />
          <BasicSearchBar />

          <BasicButton onClick={signOut} bg="secondary" sx={{ width: "100px" }}>
            Sign Out
          </BasicButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
