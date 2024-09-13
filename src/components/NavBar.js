  
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link, useLocation } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

// import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import InfoIcon from '@mui/icons-material/Info';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {authAxios} from './Axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    const { drawerWidth, content } = props;
    const location = useLocation();
    const path = location.pathname;
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()


    const logoutUser = () => {
        authAxios.post('/logoutall/', {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem("Token")}`
            }
        })
        .then(() => {
            localStorage.removeItem("Token");
            navigate('/');
        })
        .catch(error => {
            console.error("Logout failed", error);
        });
    }

    // const logoutUser = () =>{
    //     authAxios.post(`logoutall/`,{
    //     })
    //     .then( () => {
    //         localStorage.removeItem("Token")
    //         navigate('/')
    //     }

    //     )
    // }

    const changeOpenStatus = () => {
        setOpen(!open);
    };

    const myDrawer = (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/home" selected={"/home" === path}>
                            <ListItemIcon>
                                <InsightsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Recent Data"} />
                        </ListItemButton>
                    </ListItem>
                    {/* <ListItem disablePadding>
                        <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary={"About"} />
                        </ListItemButton>
                    </ListItem> */}
                    {/* <ListItem disablePadding>
                        <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                            <ListItemIcon>
                                <BorderColorIcon />
                            </ListItemIcon>
                            <ListItemText primary={"StockData Create"} />
                        </ListItemButton>
                    </ListItem> */}
                    {/* <ListItem disablePadding>
                        <ListItemButton component={Link} to="/companyCreate" selected={"/companyCreate" === path}>
                            <ListItemIcon>
                                <BorderColorIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Company Create"} />
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/companies" selected={"/companies" === path}>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Company"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/prediction" selected={"/prediction" === path}>
                            <ListItemIcon>
                                <OnlinePredictionIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Prediction"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={logoutUser}>
                            <ListItemIcon>
                                <LogoutIcon/> 
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={changeOpenStatus}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        አክሲዮን ገበያ በኢትዮጲያ
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    display: { xs: "none", sm: "block" },
                }}
            >
                {myDrawer}
            </Drawer>
            <Drawer
                variant="temporary"
                open={open}
                onClose={changeOpenStatus}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    display: { xs: "block", sm: "none" },
                }}
            >
                {myDrawer}
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    // mt: 8, // Adds margin-top to account for the AppBar height
                    // ml: { sm: `${drawerWidth}px` }, // Adds margin-left to account for the Drawer width on larger screens
                    // width: { sm: `calc(100% - ${drawerWidth}px)` }, // Adjusts the width of the main content
                }}
            >
                <Toolbar />
                {content}
            </Box>
        </Box>
    );
}
