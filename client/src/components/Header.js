import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Link
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link
            component="button"
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <MedicalServicesIcon 
              sx={{ 
                color: 'primary.main',
                fontSize: '2rem',
                mr: 1 
              }} 
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 700,
                color: 'text.primary',
                display: { xs: 'none', md: 'block' }
              }}
            >
              HealthNex
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="text"
              onClick={() => navigate('/diagnosis')}
              sx={{
                color: isActive('/diagnosis') ? 'primary.main' : 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  color: 'primary.light',
                },
              }}
            >
              Diagnosis
            </Button>
            <Button 
              variant="text"
              onClick={() => navigate('/profile')}
              sx={{
                color: isActive('/profile') ? 'primary.main' : 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  color: 'primary.light',
                },
              }}
            >
              Profile
            </Button>
            <Button 
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: 'primary.main',
                color: 'background.paper',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header; 