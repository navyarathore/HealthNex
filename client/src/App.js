import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import AuthenticatedApp from './components/AuthenticatedApp';
import LandingPage from './pages/LandingPage';
import Diagnosis from './components/Diagnosis';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import { AuthProvider } from './contexts/AuthContext';
// import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Logout from './pages/Logout';
import OfflineIndicator from './components/OfflineIndicator';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DataProtection from './pages/DataProtection';
import CookiePolicy from './pages/CookiePolicy';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2B6CB0', // Professional blue
      light: '#4299E1',
      dark: '#2C5282',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#38A169', // Professional green
      light: '#48BB78',
      dark: '#2F855A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#1A202C', // Dark slate
      paper: '#2D3748', // Slightly lighter slate
    },
    text: {
      primary: '#F7FAFC', // Off-white
      secondary: '#A0AEC0', // Light gray
    },
    divider: 'rgba(160, 174, 192, 0.2)',
    success: {
      main: '#38A169',
      light: '#48BB78',
      dark: '#2F855A',
    },
    warning: {
      main: '#DD6B20',
      light: '#ED8936',
      dark: '#C05621',
    },
    error: {
      main: '#E53E3E',
      light: '#F56565',
      dark: '#C53030',
    },
    info: {
      main: '#3182CE',
      light: '#4299E1',
      dark: '#2B6CB0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// function PrivateRoute({ children }) {
//   const { currentUser, userProfile, loading } = useAuth();
  
//   if (loading) {
//     return (
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '100vh' 
//       }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   // If user is logged in but doesn't have a profile, redirect to profile setup
//   if (!userProfile && window.location.pathname !== '/profile-setup') {
//     return <Navigate to="/profile-setup" />;
//   }

//   return children;
// }

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <OfflineIndicator />
          <Routes>
            {/* Public routes with Header component */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<><Login /></>} />
            <Route path="/register" element={<><Register /></>} />
            <Route path="/features" element={<Layout><Features /></Layout>} />
            <Route path="/about" element={<><About /></>} />
            <Route path="/contact" element={<><Contact /></>} />
            <Route path="/logout" element={<Logout />} />
            
            {/* Legal and Information Pages */}
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/data-protection" element={<DataProtection />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            
            {/* Protected routes using AuthenticatedApp */}
            <Route element={<AuthenticatedApp />}>
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;