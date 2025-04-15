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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';

const ProfileEmergency = ({ emergencyContact }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom>
        Emergency Contact
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={emergencyContact.name}
            secondary={`Relationship: ${emergencyContact.relationship}`}
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
            secondary={emergencyContact.phone}
          />
          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
            sx={{ ml: 2 }}
          >
            Call
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};

export default ProfileEmergency; 