import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../redux/reducers/userReducer";

// import LightModeIcon from "@mui/icons-material/LightMode";
// import Brightness2Icon from "@mui/icons-material/Brightness2";
import {
  Button,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Typography,
  Divider,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import { useTheme } from "@mui/material";
// import { useContext } from "react";

// import ThemeContext from "../theme/ThemeContext";
const drawerWidth = 240;
const NavBar = () => {
  const loggedInUser = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let navItems = ["Home", "Events", "Contact", "Login"];
  if (loggedInUser) {
    navItems = ["Home", "Events", "Contact", "Profile"];
  }

  //   const theme = useTheme();
  //   const colormode = useContext(ThemeContext);

  const logoutHandler = (): any => {
    dispatch(logout());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Button key={item} sx={{ color: "#fff" }}>
                <Link className="nav-link" to={item}>
                  {item}
                </Link>
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar className="nav-container" position="sticky">
        <Toolbar className="navbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            OLA
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                <Link className="nav-link" to={item}>
                  {item}
                </Link>
              </Button>
            ))}
          </Box>
          {/* <Button
            className="theme-btn"
            onClick={() => {
              colormode.changeTheme();
            }}
          >
            {theme.palette.mode === "light" ? (
              <Brightness2Icon />
            ) : (
              <LightModeIcon />
            )}
          </Button> */}
          {loggedInUser && (
            <Button color="error" variant="outlined" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
