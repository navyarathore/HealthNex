import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Layout from './Layout';

function PageNotFound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider',
              width: '100%',
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: isMobile ? '4rem' : '6rem',
                color: 'primary.main',
                mb: 2,
              }}
            />
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              404 - Page Not Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                px: 4,
                py: 1.5,
              }}
            >
              Go to Homepage
            </Button>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}

export default PageNotFound; 