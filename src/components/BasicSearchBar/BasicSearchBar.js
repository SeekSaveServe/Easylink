import { styled, alpha, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { update } from "../../features/user/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

export default function BasicSearchBar({
  searchInput = "Search...",
  setRefresh = null,
  refresh = null,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [listenerOn, setListenerOn] = useState(false);
  const user = useSelector((state) => state.user);

  // document.addEventListener("DOMContentLoaded", () => {
  //   const input = document.getElementById("searchBar");
  //   input.addEventListener("keypress", function (event) {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       // redirect to search page and update the userslice
  //       try {
  //         setLoading(true);
  //         dispatch(
  //           update({
  //             search: input.value,
  //           })
  //         );
  //         navigate("/Search", { replace: true });
  //         // Trigger a reload on the search page
  //         setRefresh ? setRefresh(!refresh) : void 0;
  //       } catch (error) {
  //         alert(alert(error.error_decription || error.message));
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   });
  // });
  const handleChange = () => {
    const input = document.getElementById("searchBar");
    // if (!listenerOn) {
    //   setListenerOn(true);
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        // redirect to search page and update the userslice
        try {
          setLoading(true);
          dispatch(
            update({
              search: input.value,
            })
          );
          navigate("/Search", { replace: true });
          // Trigger a reload on the search page
          setRefresh ? setRefresh(!refresh) : void 0;
        } catch (error) {
          alert(alert(error.error_decription || error.message));
        } finally {
          setLoading(false);
        }
      }
    });
    // }
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="searchBar"
        placeholder={searchInput}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </Search>
  );
}
