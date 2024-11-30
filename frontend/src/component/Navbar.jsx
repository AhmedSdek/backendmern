import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../context/auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Stack, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../context/cart/CartContext';


function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const nav = useNavigate()
    const { userName, isAuthenticated, logout } = useAuth();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const { cartItems } = useCart();

    const handleLogout = () => {
        logout()
        nav('/')
        handleCloseUserMenu()
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handelLogin = () => {
        nav('/login')
    }
    const handelOrders = () => {
        nav('/my-orders')
        handleCloseUserMenu();
    }
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 0,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', display: { xs: 'none', md: 'flex' }, }}>
                        <Link style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }} to='/'>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,

                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                }}
                            // onClick={() => nav('/')}
                            >
                                SDEK
                            </Typography>
                        </Link>
                    </Stack>
                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', display: { xs: 'flex', md: 'none' } }}>
                        <Link style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }} to='/'>
                            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap

                                sx={{
                                    mr: 2,
                                    flexGrow: 1,
                                    width: 'fit-content',
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit'
                                }}
                            >
                                LOGO
                            </Typography>

                        </Link>
                    </Stack>


                    <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        {isAuthenticated ?
                            <>
                                <IconButton onClick={() => {
                                    nav('/cart')
                                }} aria-label="cart">
                                    <StyledBadge badgeContent={cartItems.length} color="secondary">
                                        <ShoppingCart sx={{ color: 'white' }} />
                                    </StyledBadge>
                                </IconButton>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={`${userName}`} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handelOrders}>
                                        <Typography sx={{ textAlign: 'center' }}>my Orders</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                            :
                            <Button variant='contained' onClick={
                                handelLogin
                            }>
                                Login
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default Navbar