import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Link,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import LandingNav from '../components/LandingNav';
import Footer from '../components/Footer';

const TeamMemberCard = ({ name, role, image, linkedin, github, skills }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s ease-in-out',
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      border: '1px solid rgba(96, 165, 250, 0.1)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(96, 165, 250, 0.2)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
        background: 'linear-gradient(145deg, #1E293B, #1A1F2C)',
      }
    }}
  >
    <Avatar
      src={image}
      sx={{
        width: 120,
        height: 120,
        mb: 2,
        boxShadow: '0 4px 8px rgba(96, 165, 250, 0.2)'
      }}
    />
    <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.light' }}>
      {name}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      {role}
    </Typography>
    <Box sx={{ mt: 2, mb: 2 }}>
      {skills.map((skill, index) => (
        <Chip
          key={index}
          label={skill}
          size="small"
          sx={{ m: 0.5, bgcolor: 'primary.dark', color: 'primary.light' }}
        />
      ))}
    </Box>
    <Box sx={{ mt: 'auto', pt: 2 }}>
      <IconButton component={Link} href={linkedin} target="_blank" sx={{ color: 'primary.light' }}>
        <LinkedInIcon />
      </IconButton>
      <IconButton component={Link} href={github} target="_blank" sx={{ color: 'primary.light' }}>
        <GitHubIcon />
      </IconButton>
    </Box>
  </Paper>
);

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Frontend Developer',
      image: 'https://i.pravatar.cc/150?img=1',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      skills: ['React', 'Material-UI', 'JavaScript', 'TypeScript']
    },
    {
      name: 'Jane Smith',
      role: 'Backend Developer',
      image: 'https://i.pravatar.cc/150?img=2',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      name: 'Mike Johnson',
      role: 'UI/UX Designer',
      image: 'https://i.pravatar.cc/150?img=3',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      github: 'https://github.com/mikejohnson',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research']
    },
    {
      name: 'Sarah Williams',
      role: 'Project Manager',
      image: 'https://i.pravatar.cc/150?img=4',
      linkedin: 'https://linkedin.com/in/sarahwilliams',
      github: 'https://github.com/sarahwilliams',
      skills: ['Agile', 'Scrum', 'Project Planning', 'Team Leadership']
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LandingNav />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
          color: 'white',
          py: 8,
          mb: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(96, 165, 250, 0.1), transparent 40%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            About HealthNex
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}
          >
            A Semester Project by Computer Science Students
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Chip
              icon={<SchoolIcon />}
              label="CS 401 - Software Engineering"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.light', mb: 4 }}>
          Our Platform
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                border: '1px solid rgba(96, 165, 250, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <MedicalServicesIcon sx={{ fontSize: 48, color: 'primary.light' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                Comprehensive Health Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access a unified view of your health data, including vital signs, lab results, and medical history. Track trends and receive personalized health recommendations.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                border: '1px solid rgba(96, 165, 250, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <PsychologyIcon sx={{ fontSize: 48, color: 'primary.light' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                Smart Health Assistant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our intelligent system learns from your health patterns to provide proactive alerts, medication reminders, and lifestyle suggestions tailored to your needs.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                border: '1px solid rgba(96, 165, 250, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <HealthAndSafetyIcon sx={{ fontSize: 48, color: 'primary.light' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                Secure & Private
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your health data is encrypted and stored securely. We follow strict privacy guidelines to protect your information.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.light', mb: 4 }}>
          Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <TeamMemberCard {...member} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          py: 8,
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.1), transparent 60%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ color: 'primary.light' }}
          >
            Our Project Journey
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            HealthNex represents our semester-long journey in Software Engineering. As a team of four computer science 
            students, we combined our diverse skills to create a comprehensive health tracking platform. This project 
            challenged us to apply theoretical knowledge to practical problems, implement modern development practices, 
            and work collaboratively in a professional setting.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Chip
              icon={<CodeIcon />}
              label="View Project Repository"
              component={Link}
              href="https://github.com/your-org/healthnex"
              target="_blank"
              clickable
              sx={{ bgcolor: 'primary.dark', color: 'primary.light' }}
            />
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;