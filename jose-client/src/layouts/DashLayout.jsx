import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const drawerWidth = 240;
const petInk = "#1b1a16";
const petPaper = "#fffaf2";
const petSurface = "#fff3e0";
const petAccent = "#ff7a59";
const petAccent2 = "#2bb3d1";

const dashboardNavItems = [
  {
    label: "Home",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
  },
];

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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "rgba(255, 250, 242, 0.94)",
  backdropFilter: "blur(10px)",
  borderBottom: `2px solid ${petInk}`,
  boxShadow: "0 10px 24px rgba(27, 26, 22, 0.10)",
  color: petInk,
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    borderRight: `2px solid ${petInk}`,
    background:
      "linear-gradient(180deg, rgba(255, 250, 242, 0.98), rgba(255, 243, 224, 0.96))",
    color: petInk,
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: `2px solid rgba(27, 26, 22, 0.18)`,
  borderRadius: 999,
  backgroundColor: "rgba(255, 250, 242, 0.82)",
  "&:hover": {
    backgroundColor: alpha(petAccent2, 0.12),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) => {
  const normalizedPathname = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  return dashboardNavItems.find((t) => t.to === normalizedPathname)?.title ?? "Welcome";
};

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const normalizedPathname = location.pathname.endsWith("/") && location.pathname !== "/"
    ? location.pathname.slice(0, -1)
    : location.pathname;
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* App Bar */}
        {/* <AppBar position="fixed" open={open}> */}
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={open}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              // sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
              sx={{
                marginRight: 3,
                border: `2px solid ${petInk}`,
                bgcolor: petPaper,
                color: petInk,
                "&:hover": { bgcolor: petSurface },
              }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, fontWeight: 800 }}
            >
              {pageTitle}
            </Typography>
            {/* Search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button color="inherit" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {/* Drawer */}
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
          {/* Drawer List */}
          <List>
            {dashboardNavItems.map(({ label, to, icon: Icon }) => (
              <ListItem key={to} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={normalizedPathname === to}
                  sx={{
                    borderRadius: 999,
                    color: "rgba(27, 26, 22, 0.72)",
                    mx: 1,
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                    "&.Mui-selected": {
                      bgcolor: petInk,
                      color: petPaper,
                      "& .MuiListItemIcon-root": { color: petPaper },
                    },
                    "&.Mui-selected:hover": {
                      bgcolor: petInk,
                    },
                    "&:hover": {
                      bgcolor: "rgba(255, 122, 89, 0.14)",
                      color: petInk,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          className="pet-bg pet-bg--paws"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            p: { xs: 2, md: 3 },
            background:
              "radial-gradient(1200px 600px at 15% -10%, rgba(255, 122, 89, 0.20), transparent 55%), radial-gradient(900px 500px at 95% 10%, rgba(43, 179, 209, 0.18), transparent 50%), var(--pet-paper)",
          }}
        >
          <DrawerHeader />
          {/* Content */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashLayout;
