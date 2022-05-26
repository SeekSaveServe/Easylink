import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BasicAvatar from "../BasicAvatar/BasicAvatar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../supabaseClient";
import BasicButton from "../BasicButton";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function BasicNavBar() {
  const userProfile = useSelector((state) => state.user);

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "var(--primary)" }}>
      <AppBar position="static">
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
            <BasicAvatar
              src={userProfile.avatarUrl}
              alt={userProfile.avatarUrl ? "Avatar" : "No image"}
            />{" "}
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
              isActive
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <BasicButton onClick={signOut} bg="secondary" sx={{ width: "100px" }}>
            Sign Out
          </BasicButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
