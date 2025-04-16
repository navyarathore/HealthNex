import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { isOnline, addNetworkStatusListener } from '../utils/firestoreHelper';

const OfflineIndicator = () => {
  const [offline, setOffline] = useState(!isOnline());
  
  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
    };
    
    const handleOffline = () => {
      setOffline(true);
    };
    
    // Add event listeners for online/offline status
    const cleanup = addNetworkStatusListener(handleOnline, handleOffline);
    
    return () => {
      cleanup();
    };
  }, []);
  
  return (
    <Snackbar 
      open={offline} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        severity="warning" 
        icon={<WifiOffIcon />}
        sx={{ 
          width: '100%',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          '& .MuiAlert-icon': { color: '#721c24' }
        }}
      >
        You're currently offline. Some features may be limited.
      </Alert>
    </Snackbar>
  );
};

export default OfflineIndicator;