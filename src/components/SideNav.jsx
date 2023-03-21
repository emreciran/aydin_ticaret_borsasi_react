import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItemText,
  ListItem,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "./Header";
import CampaignIcon from "@mui/icons-material/Campaign";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate, Outlet } from "react-router-dom";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const navLinks = [
  { text: "Ana Sayfa", icon: <HomeIcon />, routeName: "/" },
  { text: "Kullanıcılar", icon: <GroupIcon />, routeName: "kullanicilar" },
  { text: "Duyurular", icon: <CampaignIcon />, routeName: "duyuru" },
  { text: "Haberler", icon: <NewspaperIcon />, routeName: "haber" },
];

const SideNav = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header setOpen={setOpen} open={open} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navLinks.map((navLink, index) => (
            <Box key={index}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(`${navLink.routeName}`)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {navLink.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={navLink.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <CssBaseline />
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SideNav;
