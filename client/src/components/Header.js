import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  Slide,
  Chip,
  Paper,
  InputBase,
  Collapse,
  Stack,
  ButtonGroup,
  ClickAwayListener,
  LinearProgress,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import BiotechIcon from '@mui/icons-material/Biotech';
import SpeedIcon from '@mui/icons-material/Speed';
import AddIcon from '@mui/icons-material/Add';
import MedicationIcon from '@mui/icons-material/Medication';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Styled search component 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.04)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.12)' 
      : 'rgba(0, 0, 0, 0.07)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
}));

// Styled nav button
const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: '6px 16px',
  transition: 'all 0.2s',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { currentUser, userProfile, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previousScrollPos, setPreviousScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [showAnnouncementBanner, setShowAnnouncementBanner] = useState(true);
  const [healthScoreLoading, setHealthScoreLoading] = useState(false);

  // User authentication state
  const isAuthenticated = !!currentUser;
  const healthScore = userProfile?.healthScore || 85;
  const healthScoreColor = healthScore > 80 ? 'success' : healthScore > 60 ? 'warning' : 'error';
  const userInitial = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U';
  const userEmail = currentUser?.email || 'user@example.com';
  const userName = userProfile?.name || 'User';

  // Mock notifications
  const notifications = [
    { id: 1, message: "New health report available", time: "5 minutes ago", read: false, type: "info" },
    { id: 2, message: "Your doctor responded to your query", time: "2 hours ago", read: false, type: "success" },
    { id: 3, message: "Reminder: Take your medication", time: "1 day ago", read: true, type: "warning" },
    { id: 4, message: "Health metrics updated", time: "2 days ago", read: true, type: "info" },
  ];

  // Mock search results
  const mockSearchResults = [
    { id: 1, title: "Health Metrics Dashboard", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { id: 2, title: "Diagnosis Tool", path: "/diagnosis", icon: <LocalHospitalIcon fontSize="small" /> },
    { id: 3, title: "Heart Rate Monitoring", path: "/metrics/heart-rate", icon: <MonitorHeartIcon fontSize="small" /> },
    { id: 4, title: "User Profile Settings", path: "/profile", icon: <AccountCircleIcon fontSize="small" /> },
  ];

  // Quick action definitions
  const quickActions = [
    { icon: <AssessmentIcon />, name: 'New Health Report', action: () => navigate('/dashboard') },
    { icon: <FavoriteIcon />, name: 'Track Vitals', action: () => navigate('/metrics') },
    { icon: <MedicationIcon />, name: 'Medication Reminder', action: () => navigate('/reminders') },
    { icon: <LocalHospitalIcon />, name: 'Quick Diagnosis', action: () => navigate('/diagnosis') },
  ];

  // Track menu states
  const isActive = (path) => location.pathname === path;
  const profileOpen = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);
  const resourcesOpen = Boolean(resourcesAnchorEl);
  
  // Enhanced scroll control for hiding/showing header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const hasScrolled = currentScrollPos > 10;
      
      // Show/hide based on scroll direction with a threshold
      const visible = previousScrollPos > currentScrollPos || currentScrollPos < 50;
      
      setScrolled(hasScrolled);
      setVisible(visible);
      setPreviousScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [previousScrollPos]);

  // Handle drawer toggle
  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // Handle profile menu
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  
  // Handle notifications
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  
  // Handle resources dropdown
  const handleResourcesClick = (event) => {
    setResourcesAnchorEl(event.currentTarget);
  };
  
  const handleResourcesClose = () => {
    setResourcesAnchorEl(null);
  };
  
  // Handle search toggle
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.getElementById('header-search-input')?.focus();
      }, 100);
    }
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      // Filter mock results based on query
      const filtered = mockSearchResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      setHealthScoreLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setHealthScoreLoading(false);
    }
  };

  // Handle quick action toggle
  const handleQuickActionToggle = () => {
    setQuickActionsOpen(!quickActionsOpen);
  };

  // Close announcement banner
  const handleCloseAnnouncement = () => {
    setShowAnnouncementBanner(false);
  };

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Navigation items with nested dropdown capabilities
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Diagnosis', icon: <LocalHospitalIcon />, path: '/diagnosis' },
    { text: 'Health Metrics', icon: <MonitorHeartIcon />, path: '/metrics' },
  ];

  // Resources dropdown items
  const resourceItems = [
    { text: 'Health Articles', icon: <ArticleOutlinedIcon />, path: '/articles' },
    { text: 'Medical Records', icon: <FolderSharedIcon />, path: '/records' },
    { text: 'Lab Results', icon: <BiotechIcon />, path: '/lab-results' },
    { text: 'Support', icon: <ChatBubbleOutlineIcon />, path: '/support' },
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%'
      }}>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MedicalServicesIcon 
              sx={{ 
                color: 'primary.main',
                fontSize: '2rem',
                mr: 1 
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              HealthNex
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <Paper
            component="form"
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 2
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search HealthNex"
              inputProps={{ 'aria-label': 'search healthnex' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.text}
                button 
                selected={isActive(item.path)}
                onClick={() => {
                  navigate(item.path);
                  toggleDrawer();
                }}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: isActive(item.path) ? 'primary.dark' : 'transparent',
                  color: isActive(item.path) ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive(item.path) ? 'primary.dark' : 'action.hover',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'primary.dark',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive(item.path) ? 'primary.contrastText' : 'primary.main',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                <KeyboardArrowRightIcon fontSize="small" sx={{ 
                  opacity: isActive(item.path) ? 1 : 0.5
                }} />
              </ListItem>
            ))}

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="overline" sx={{ px: 1, color: 'text.secondary' }}>
              Resources
            </Typography>
            
            {resourceItems.map((item) => (
              <ListItem 
                key={item.text}
                button 
                onClick={() => {
                  navigate(item.path);
                  toggleDrawer();
                }}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body2', 
                    sx: { fontWeight: 500 } 
                  }}
                />
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="overline" sx={{ px: 1, color: 'text.secondary' }}>
            Account
          </Typography>
          
          <List>
            <ListItem 
              button 
              onClick={() => {
                navigate('/profile');
                toggleDrawer();
              }}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            
            <ListItem 
              button 
              onClick={() => {
                navigate('/settings');
                toggleDrawer();
              }}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            
            <ListItem button sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
        
        <Box 
          sx={{ 
            p: 2, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            &copy; {new Date().getFullYear()} HealthNex
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Change theme">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Change language">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <LanguageIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlineIcon fontSize="small" color="success" />;
      case 'warning':
        return <ErrorOutlineIcon fontSize="small" color="warning" />;
      default:
        return <InfoOutlinedIcon fontSize="small" color="info" />;
    }
  };

  return (
    <Slide appear={false} direction="down" in={visible}>
      <AppBar 
        position="sticky" 
        elevation={scrolled ? 2 : 0}
        sx={{
          backgroundColor: scrolled ? 'background.paper' : 'background.paper',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.3s ease-in-out',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        }}
      >
        {/* Announcement banner - can be toggled with state */}
        {showAnnouncementBanner && (
          <Box 
            sx={{ 
              bgcolor: 'info.main', 
              color: 'info.contrastText',
              py: 0.5,
              px: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span role="img" aria-label="celebration">🎉</span>&nbsp;New feature release: Advanced health analytics now available! 
            <Link href="/features" sx={{ color: 'inherit', fontWeight: 'bold', textDecoration: 'underline', mx: 1 }}>
              Learn more
            </Link>
            <IconButton 
              size="small" 
              aria-label="close announcement"
              onClick={handleCloseAnnouncement}
              sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'inherit' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: { xs: 64, md: scrolled ? 70 : 80 }, 
              transition: 'all 0.3s ease-in-out',
              justifyContent: 'space-between'
            }}
          >
            {/* Left section: Mobile menu button + Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Mobile menu button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ mr: 1, color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              {/* Logo */}
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
                  transition: 'transform 0.2s ease',
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <Zoom in={true} timeout={800}>
                  <Box sx={{ position: 'relative' }}>
                    <MedicalServicesIcon 
                      sx={{ 
                        color: 'primary.main',
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': {
                            transform: 'scale(1)',
                          },
                          '50%': {
                            transform: 'scale(1.05)',
                          },
                          '100%': {
                            transform: 'scale(1)',
                          },
                        },
                      }} 
                    />
                    <HealthAndSafetyIcon
                      sx={{
                        position: 'absolute',
                        fontSize: '0.8rem',
                        bgcolor: 'background.paper',
                        borderRadius: '50%',
                        p: 0.1,
                        bottom: -4,
                        right: -4,
                        color: 'primary.dark',
                      }}
                    />
                  </Box>
                </Zoom>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ 
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: 'text.primary',
                      display: { xs: 'none', md: 'block' },
                      background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    HealthNex
                  </Typography>
                  {!isMobile && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: { xs: 'none', md: 'block' },
                        color: 'text.secondary',
                        mt: -0.5
                      }}
                    >
                      Your AI Health Partner
                    </Typography>
                  )}
                </Box>
              </Link>
            </Box>

            {/* Center section: Search + Nav */}
            <Box sx={{ 
              display: 'flex', 
              flexGrow: 1, 
              justifyContent: { xs: 'flex-end', md: 'center' },
              mx: { xs: 1, md: 2 }
            }}>
              {/* Desktop Search Bar */}
              {!isMobile && (
                <Fade in={!isMobile}>
                  <Search sx={{ 
                    width: isDesktop ? '25%' : '250px',
                    position: 'relative'
                  }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search health topics..."
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      id="header-search-input"
                    />
                    
                    {/* Search Results Dropdown */}
                    <Collapse in={searchQuery.length > 1} sx={{ position: 'absolute', width: '100%', zIndex: 99 }}>
                      <Paper sx={{ mt: 0.5, maxHeight: 300, overflow: 'auto', boxShadow: 3, borderRadius: 2 }}>
                        {searchResults.length > 0 ? (
                          <List dense disablePadding>
                            {searchResults.map((result) => (
                              <ListItem 
                                key={result.id} 
                                button 
                                onClick={() => {
                                  navigate(result.path);
                                  setSearchQuery('');
                                  setSearchResults([]);
                                }}
                                sx={{ py: 1 }}
                              >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                  {result.icon}
                                </ListItemIcon>
                                <ListItemText 
                                  primary={result.title} 
                                  primaryTypographyProps={{ 
                                    variant: 'body2',
                                    sx: { fontWeight: 500 }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              No results found
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    </Collapse>
                  </Search>
                </Fade>
              )}

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
                  {navItems.map((item, index) => (
                    <Fade in={true} key={item.text} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                      <NavButton 
                        variant={isActive(item.path) ? "contained" : "text"}
                        startIcon={item.icon}
                        onClick={() => navigate(item.path)}
                        sx={{
                          color: isActive(item.path) ? 'white' : 'text.primary',
                          backgroundColor: isActive(item.path) ? 'primary.main' : 'transparent',
                          minWidth: isDesktop ? 'unset' : 'auto',
                          '&:hover': {
                            backgroundColor: isActive(item.path) ? 'primary.dark' : 'rgba(59, 130, 246, 0.08)',
                          },
                          position: 'relative',
                          '&::after': isActive(item.path) ? {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            transition: 'all 0.3s ease'
                          } : {},
                        }}
                      >
                        {isDesktop ? item.text : null}
                      </NavButton>
                    </Fade>
                  ))}
                  
                  {/* Resources dropdown button */}
                  <NavButton
                    aria-controls={resourcesOpen ? 'resources-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={resourcesOpen ? 'true' : undefined}
                    onClick={handleResourcesClick}
                    endIcon={<ExpandMoreIcon 
                      sx={{ 
                        transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }} 
                    />}
                    sx={{ color: 'text.primary' }}
                  >
                    Resources
                  </NavButton>
                </Box>
              )}
            </Box>

            {/* Right section: Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {/* Mobile Search Toggle */}
              {isMobile && (
                <Tooltip title="Search">
                  <IconButton 
                    color="inherit" 
                    onClick={toggleSearch}
                    sx={{ color: 'text.primary' }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              )}
              
              {/* Health Score Indicator - only show when authenticated */}
              {isAuthenticated && !isMobile && (
                <Tooltip title="Your current health score">
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      borderRadius: 16,
                      px: 1.5,
                      py: 0.5,
                      mr: 1
                    }}
                  >
                    <FavoriteIcon 
                      color={healthScoreColor} 
                      fontSize="small" 
                      sx={{ mr: 0.5 }} 
                    />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {healthScore}
                    </Typography>
                  </Box>
                </Tooltip>
              )}
              
              {/* Theme Toggle */}
              {!isMobile && (
                <Tooltip title="Toggle theme">
                  <IconButton
                    color="inherit"
                    aria-label="toggle dark/light theme"
                    sx={{ color: 'text.secondary' }}
                  >
                    {theme.palette.mode === 'dark' 
                      ? <LightModeOutlinedIcon /> 
                      : <DarkModeOutlinedIcon />
                    }
                  </IconButton>
                </Tooltip>
              )}
              
              {/* Notifications - only show when authenticated */}
              {isAuthenticated && (
                <Tooltip title="Notifications">
                  <IconButton 
                    color="inherit" 
                    onClick={handleNotificationClick}
                    aria-label="notifications"
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      },
                    }}
                  >
                    <Badge 
                      badgeContent={unreadCount} 
                      color="error"
                      sx={{
                        '& .MuiBadge-badge': {
                          animation: unreadCount > 0 ? 'pulse 1.5s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.2)' },
                            '100%': { transform: 'scale(1)' },
                          }
                        }
                      }}
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
              
              {/* Profile Menu or Auth Buttons based on authentication state */}
              {isAuthenticated ? (
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleProfileClick}
                    size="small"
                    aria-label="account settings"
                    sx={{ 
                      ml: 1,
                      border: '2px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                      p: 0.5,
                      transition: 'transform 0.2s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        background: 'linear-gradient(45deg, #3B82F6, #60A5FA)'
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="primary"
                    onClick={() => navigate('/login')}
                    sx={{ borderRadius: 2 }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small" 
                    color="primary"
                    onClick={() => navigate('/register')}
                    sx={{ borderRadius: 2 }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
          
          {/* Mobile Search Collapse */}
          <Collapse in={isMobile && showSearch}>
            <Box sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              <Paper
                component="form"
                sx={{ 
                  p: '2px 4px', 
                  display: 'flex', 
                  alignItems: 'center',
                  borderRadius: 2
                }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search health topics..."
                  inputProps={{ 'aria-label': 'search healthnex' }}
                  autoFocus
                />
                <IconButton sx={{ p: '10px' }} aria-label="close" onClick={toggleSearch}>
                  <CloseIcon />
                </IconButton>
              </Paper>
            </Box>
          </Collapse>
        </Container>
        
        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={notificationOpen}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              width: 320,
              maxHeight: 400,
              mt: 1.5,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              borderRadius: 2,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center' 
          }}>
            <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
            {unreadCount > 0 && (
              <Chip 
                label={`${unreadCount} new`} 
                color="primary" 
                size="small" 
                sx={{ height: 24 }}
              />
            )}
          </Box>
          
          {notifications.length > 0 ? (
            <List sx={{ py: 0 }}>
              {notifications.map((notification) => (
                <MenuItem 
                  key={notification.id} 
                  onClick={handleNotificationClose}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    borderLeft: notification.read ? 'none' : '3px solid',
                    borderColor: notification.read ? 'transparent' : 'primary.main',
                    bgcolor: notification.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ mr: 1.5, pt: 0.3 }}>
                      {getNotificationIcon(notification.type)}
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: notification.read ? 400 : 600,
                          color: notification.read ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          display: 'block',
                          mt: 0.5
                        }}
                      >
                        {notification.time}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No notifications yet
              </Typography>
            </Box>
          )}
          
          <Box 
            sx={{ 
              p: 1, 
              borderTop: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between' 
            }}
          >
            <Button size="small" onClick={handleNotificationClose}>
              Mark all as read
            </Button>
            <Button size="small" onClick={handleNotificationClose}>
              View all
            </Button>
          </Box>
        </Menu>
        
        {/* Resources Menu */}
        <Menu
          anchorEl={resourcesAnchorEl}
          open={resourcesOpen}
          onClose={handleResourcesClose}
          onClick={handleResourcesClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 220,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {resourceItems.map((resource) => (
            <MenuItem 
              key={resource.text} 
              onClick={() => navigate(resource.path)}
              sx={{ py: 1.2 }}
            >
              <ListItemIcon>{resource.icon}</ListItemIcon>
              <ListItemText>{resource.text}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
        
        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={profileOpen}
          onClose={handleProfileClose}
          onClick={handleProfileClose}
          PaperProps={{
            sx: {
              width: 280,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              borderRadius: 2,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                mb: 1,
                mx: 'auto',
                background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
                border: '3px solid',
                borderColor: 'background.paper',
                boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
              }}
            >
              {userInitial}
            </Avatar>
            <Typography variant="subtitle1" fontWeight={600}>{userName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {userEmail}
            </Typography>
            <Box sx={{ position: 'relative' }}>
              {healthScoreLoading ? (
                <LinearProgress size="sm" sx={{ borderRadius: 5 }} />
              ) : (
                <Chip 
                  size="small" 
                  label={`Health Score: ${healthScore}`} 
                  color={healthScoreColor}
                  icon={<FavoriteIcon fontSize="small" />}
                  sx={{ fontWeight: 500 }} 
                />
              )}
            </Box>
          </Box>
          
          <Divider />
          
          <MenuItem onClick={() => navigate('/profile')} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          
          <MenuItem onClick={() => navigate('/dashboard')} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>
          
          <MenuItem onClick={() => navigate('/settings')} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          
          <Divider />
          
          <Box sx={{ p: 1.5 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<ExitToAppIcon />}
              sx={{ borderRadius: 2 }}
              onClick={handleLogout}
              disabled={healthScoreLoading}
            >
              {healthScoreLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </Box>
        </Menu>

        {/* Quick Actions Speed Dial (only shown for authenticated users) */}
        {isAuthenticated && !isMobile && (
          <SpeedDial
            ariaLabel="quick actions"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
            onClose={() => setQuickActionsOpen(false)}
            onOpen={() => setQuickActionsOpen(true)}
            open={quickActionsOpen}
          >
            {quickActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
                tooltipOpen={isDesktop}
              />
            ))}
          </SpeedDial>
        )}
      </AppBar>
    </Slide>
  );
}

export default Header;