import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "/logo150.png";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../router/AuthProvider";
import { PiUserCircleFill } from "react-icons/pi";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
    const { user, logOut } = React.useContext(AuthContext);
    // console.log(user);

    const [shopOwners, setShopOwners] = React.useState([]);

    const axiosPublic = useAxiosPublic();

    React.useEffect(() => {
        axiosPublic
            .get("/imsUsersDB")
            .then((res) => {
                const existingEmail = res.data.find(
                    (users) => users?.email === user?.email
                );
                setShopOwners(existingEmail);
            })
            .catch((error) => {
                console.log("fetching error ", error);
            });
    }, [axiosPublic, user?.email]);

    // console.log(shopOwners.shopId);

    const navLinks = (
        <>
            <div className="flex space-x-6 list-none mx-auto">
                <li>
                    <NavLink
                        to="/"
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                transition: "all 0.2s",
                                textDecoration: isActive ? "underline" : "",
                                color: isPending ? "white" : "white",
                            };
                        }}
                    >
                        HOME
                    </NavLink>
                </li>

                {shopOwners?.shopId ? (
                    <li>
                        <NavLink
                            to="/dashboard"
                            style={({ isActive, isPending }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    transition: "all 0.2s",
                                    textDecoration: isActive ? "underline" : "",
                                    color: isPending ? "white" : "white",
                                };
                            }}
                        >
                            DASHBOARD
                        </NavLink>
                    </li>
                ) : (
                    <li>
                        <NavLink
                            to="/create-shop"
                            style={({ isActive, isPending }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    transition: "all 0.2s",
                                    textDecoration: isActive ? "underline" : "",
                                    color: isPending ? "white" : "white",
                                };
                            }}
                        >
                            CREATE-SHOP
                        </NavLink>
                    </li>
                )}

                {user?.email ? (
                    ""
                ) : (
                    <li>
                        <NavLink
                            to="/login"
                            style={({ isActive, isPending }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    transition: "all 0.2s",
                                    textDecoration: isActive ? "underline" : "",
                                    color: isPending ? "white" : "white",
                                };
                            }}
                        >
                            LOGIN
                        </NavLink>
                    </li>
                )}

                {user?.email ? (
                    ""
                ) : (
                    <li>
                        <NavLink
                            to="/register"
                            style={({ isActive, isPending }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    transition: "all 0.2s",
                                    textDecoration: isActive ? "underline" : "",
                                    color: isPending ? "white" : "white",
                                };
                            }}
                        >
                            REGISTER
                        </NavLink>
                    </li>
                )}

                <li>
                    <NavLink
                        to="/watch-demo"
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                transition: "all 0.2s",
                                textDecoration: isActive ? "underline" : "",
                                color: isPending ? "white" : "white",
                            };
                        }}
                    >
                        WATCH-DEMO
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/amis"
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                transition: "all 0.2s",
                                textDecoration: isActive ? "underline" : "",
                                color: isPending ? "white" : "white",
                            };
                        }}
                    >
                        Amis
                    </NavLink>
                </li>
            </div>
        </>
    );

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("you have logged out successfully");
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ background: "#B93B5E" }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Stack>
                        <img
                            className="hidden md:flex"
                            style={{ width: "92px" }}
                            src={logo}
                            alt=""
                        />
                    </Stack>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Stack>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {navLinks}
                            </Menu>
                        </Stack>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {navLinks}
                    </Box>

                    <div className="">
                        {user ? (
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <div>
                                        {user?.photoURL ? (
                                            <img
                                                className="md:w-10 md:h-10 w-8 h-8 md:mr-4 rounded-full"
                                                src={user?.photoURL}
                                            />
                                        ) : (
                                            <PiUserCircleFill className="text-4xl md:mr-4" />
                                        )}
                                    </div>
                                    <div className="">
                                        {user?.displayName ? (
                                            <p className=" md:text-white text-xs md:text-base underline">
                                                {user?.displayName}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="md:px-3 md:py-2 md:bg-[#F0895D] text-sm md:text-white  text-black underline md:no-underline md:ml-4 md:font-semibold"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt=""
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
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
