import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "./AppBar";
import Toolbar from "./Toolbar";
import { removeUser, selectUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import FaceIcon from "@mui/icons-material/Face";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { SyntheticEvent, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Avatar from "@mui/material/Avatar";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [open, setOpen] = useState<any>(null);

  const handleOpenMenu = (event: SyntheticEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 20 }}
          >
            {"Coredge  Task Manager"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button color="inherit" href="/create-task">
              Add Task
            </Button>

            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main" }}
              onClick={handleOpenMenu}
            >
              <FaceIcon />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 20, horizontal: 50 }}
        transformOrigin={{ vertical: 20, horizontal: 50 }}
      >
        <MenuItem>
          <PersonOutlineIcon fontSize="small" sx={{ mr: "40px" }} />
          {user.username}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: "40px" }} />
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

export default Header;
