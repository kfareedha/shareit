import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  FormControl,
  FormControlLabel,
  Switch,
  Divider,
  createTheme,
} from "@mui/material";
import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import FeedIcon from "@mui/icons-material/Feed";
import ReportIcon from "@mui/icons-material/ReportProblem";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const active = createTheme({
  active: {
    background: "#fff9c4",
  },
});

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      flex={1}
      p={3}
      sx={{
        display: { xs: "none", lg: "block" },
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#fff9c4",
          height: "80vh",

          boxShadow: 3,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={() => navigate("/admin/users")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="USERS" />
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton onClick={() => navigate("/admin/posts")}>
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="POSTS" />
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton onClick={() => navigate("/admin/rposts")}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="REPORTED POSTS" />
        </ListItemButton>
        <Divider variant="middle" />
      </List>
    </Box>
  );
}

export default SideBar;
