import React, { useState } from "react";
import Logo from "../assets/logo-atb.png";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { logout } from "../redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      elevation={4}
      position="fixed"
      sx={{ backgroundColor: "#fff", color: "#2f2f2f" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component={Link} to="/">
          <img src={Logo} alt="" width={250} style={{ marginLeft: "15px" }} />
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user?.given_name}
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={() => {
                navigate("/profil");
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Çıkış Yap</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
