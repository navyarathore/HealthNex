import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  Box,
  TextField,
  Skeleton,
  MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';

const ProfileEmergency = ({ emergencyContact, isEditing, onInputChange, loading = false }) => {
  // Helper function to handle changes to emergency contact fields 
  // that maps back to the direct properties on the parent
  const handleEmergencyContactChange = (field) => (e) => {
    if (onInputChange) {
      // Map to the direct property names used in the parent component
      const fieldMap = {
        'name': 'emergencyContactName',
        'phone': 'emergencyContactPhone',
        'relationship': 'emergencyContactRelationship'
      };
      
      onInputChange(fieldMap[field])(e);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom>
        Emergency Contact
      </Typography>
      
      {isEditing ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            You can update your emergency contact information below.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {loading ? (
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
            ) : (
              <TextField
                fullWidth
                label="Contact Name"
                value={emergencyContact?.name || ''}
                onChange={handleEmergencyContactChange('name')}
                disabled={loading}
              />
            )}
            
            {loading ? (
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
            ) : (
              <TextField
                fullWidth
                label="Phone Number"
                value={emergencyContact?.phone || ''}
                onChange={handleEmergencyContactChange('phone')}
                disabled={loading}
              />
            )}
            
            {loading ? (
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
            ) : (
              <TextField
                select
                fullWidth
                label="Relationship"
                value={emergencyContact?.relationship || ''}
                onChange={handleEmergencyContactChange('relationship')}
                disabled={loading}
              >
                <MenuItem value="">Select Relationship</MenuItem>
                <MenuItem value="spouse">Spouse</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="child">Child</MenuItem>
                <MenuItem value="sibling">Sibling</MenuItem>
                <MenuItem value="friend">Friend</MenuItem>
                <MenuItem value="relative">Other Relative</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          </Box>
        </Box>
      ) : (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={emergencyContact?.name || 'Not specified'}
              secondary={`Relationship: ${emergencyContact?.relationship || 'Not specified'}`}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <PhoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Phone Number"
              secondary={emergencyContact?.phone || 'Not specified'}
            />
            {emergencyContact?.phone && (
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                sx={{ ml: 2 }}
                component="a"
                href={`tel:${emergencyContact.phone}`}
              >
                Call
              </Button>
            )}
          </ListItem>
        </List>
      )}
    </Paper>
  );
};

export default ProfileEmergency;