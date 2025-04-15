import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const LandingNav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <MedicalServicesIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate('/')}
              sx={{ 
                fontWeight: 'bold', 
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              HealthNex
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleNavigation('/features')}>
                  Features
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/about')}>
                  About
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/contact')}>
                  Contact
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/login')}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/register')}>
                  Register
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => navigate('/features')}>
                Features
              </Button>
              <Button color="inherit" onClick={() => navigate('/about')}>
                About
              </Button>
              <Button color="inherit" onClick={() => navigate('/contact')}>
                Contact
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingNav; 