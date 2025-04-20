import { useState, useEffect } from 'react';
import { isOnline, addNetworkStatusListener } from '../utils/firestoreHelper';
import { checkServerConnection } from '../services/api';

const OfflineIndicator = () => {
  const [internetOffline, setInternetOffline] = useState(!isOnline());
  const [serverOffline, setServerOffline] = useState(false);
  
  // Check server connection
  const checkServer = async () => {
    try {
      const result = await checkServerConnection();
      setServerOffline(!result.connected);
      if (!result.connected) {
        console.warn("Cannot connect to the HealthNex server. The server may be down or restarting.");
      }
    } catch (error) {
      console.error('Error checking server connection:', error);
      setServerOffline(true);
    }
  };
  
  useEffect(() => {
    // Initial server check
    checkServer();
    
    // Set up periodic server checks (every 30 seconds)
    const serverCheckInterval = setInterval(() => {
      if (!internetOffline && !serverOffline) {
        checkServer();
      }
    }, 30000);
    
    // Handle internet online/offline status
    const handleOnline = () => {
      setInternetOffline(false);
      console.log("Internet connection restored");
      checkServer();
    };
    
    const handleOffline = () => {
      setInternetOffline(true);
      setServerOffline(true);
      console.warn("You're currently offline. Please check your internet connection.");
    };
    
    // Add event listeners for online/offline status
    const cleanup = addNetworkStatusListener(handleOnline, handleOffline);
    
    return () => {
      cleanup();
      clearInterval(serverCheckInterval);
    };
  }, [internetOffline, serverOffline]);
  
  // Return null since we don't want to render anything
  return null;
};

export default OfflineIndicator;