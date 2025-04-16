import React, { useState } from 'react';
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
  Divider,
  Button,
  TextField,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import Layout from '../components/Layout';

// Tech stack card component
const TechStackCard = ({ name, icon, description }) => (
  <Card sx={{
    height: '100%',
    background: 'linear-gradient(145deg, #1E293B, #0F172A)',
    border: '1px solid rgba(96, 165, 250, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(96, 165, 250, 0.2)',
    }
  }}>
    <CardContent sx={{ textAlign: 'center', p: 3 }}>
      <Box sx={{ fontSize: 50, color: 'primary.light', mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

// Timeline Milestone card component (replacement for Timeline)
const MilestoneCard = ({ date, title, description, isLast }) => (
  <Box sx={{ position: 'relative', mb: isLast ? 0 : 4, pl: 4 }}>
    {/* Vertical line */}
    {!isLast && (
      <Box sx={{ 
        position: 'absolute', 
        left: 10, 
        top: 32, 
        bottom: -32, 
        width: 2, 
        bgcolor: 'primary.light',
        zIndex: 0 
      }} />
    )}
    
    {/* Dot */}
    <Box sx={{ 
      position: 'absolute', 
      left: 0, 
      top: 24, 
      width: 20, 
      height: 20, 
      borderRadius: '50%', 
      bgcolor: 'primary.main',
      border: '3px solid',
      borderColor: 'primary.light',
      zIndex: 1
    }} />
    
    {/* Content */}
    <Paper sx={{ 
      p: 2, 
      bgcolor: 'background.paper',
      border: '1px solid rgba(96, 165, 250, 0.1)',
    }}>
      <Typography color="text.secondary" variant="subtitle2" gutterBottom>
        {date}
      </Typography>
      <Typography variant="h6" component="h3" sx={{ color: 'primary.light' }}>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Paper>
  </Box>
);

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
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', message: '' });
  
  const handleFeedbackChange = (e) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Feedback submitted:', feedbackForm);
    // Reset form
    setFeedbackForm({ name: '', email: '', message: '' });
    // Show confirmation (in a real app, you might use a snackbar)
    alert('Thank you for your feedback!');
  };

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

  const techStack = [
    {
      name: 'React.js',
      icon: <i className="devicon-react-original colored" />,
      description: 'Frontend library for building dynamic user interfaces with reusable components'
    },
    {
      name: 'Material-UI',
      icon: <i className="devicon-materialui-plain colored" />,
      description: 'React component library implementing Google\'s Material Design'
    },
    {
      name: 'Node.js',
      icon: <i className="devicon-nodejs-plain colored" />,
      description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side development'
    },
    {
      name: 'Express',
      icon: <i className="devicon-express-original" />,
      description: 'Fast, unopinionated, minimalist web framework for Node.js'
    },
    {
      name: 'MongoDB',
      icon: <i className="devicon-mongodb-plain colored" />,
      description: 'NoSQL database for modern applications with flexible document schemas'
    },
    {
      name: 'Firebase',
      icon: <i className="devicon-firebase-plain colored" />,
      description: 'Platform for web development with authentication, storage, and analytics'
    }
  ];

  const projectTimeline = [
    {
      date: 'January 2025',
      title: 'Project Kickoff',
      description: 'Initial planning, requirements gathering, and team formation'
    },
    {
      date: 'February 2025',
      title: 'Design & Architecture',
      description: 'UI/UX design, database schema design, and system architecture planning'
    },
    {
      date: 'March 2025',
      title: 'Development Phase',
      description: 'Core functionality implementation, frontend and backend development'
    },
    {
      date: 'April 2025',
      title: 'Testing & Refinement',
      description: 'User testing, bug fixing, and feature refinement based on feedback'
    },
    {
      date: 'May 2025',
      title: 'Deployment',
      description: 'Final deployment and presentation of the complete application'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
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
        {/* Mission Statement Section */}
        <Paper sx={{ 
          p: 5, 
          mb: 8, 
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          border: '1px solid rgba(96, 165, 250, 0.1)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box 
            sx={{ 
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1), transparent 70%)',
              zIndex: 0
            }} 
          />
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.light', position: 'relative', zIndex: 1 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
            At HealthNex, we're committed to revolutionizing personal healthcare management through technology. Our mission is to empower individuals to take control of their health journey by providing intelligent, accessible tools that transform complex health data into actionable insights.
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
            We believe that everyone deserves access to personalized health information that's easy to understand and act upon. By combining data science, artificial intelligence, and user-centered design, we're creating a platform that not only tracks health metrics but interprets them in meaningful ways that improve quality of life.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3, position: 'relative', zIndex: 1 }}>
            <Chip label="Health Equity" size="small" sx={{ bgcolor: 'primary.dark', color: 'primary.light' }} />
            <Chip label="User Empowerment" size="small" sx={{ bgcolor: 'primary.dark', color: 'primary.light' }} />
            <Chip label="Technical Innovation" size="small" sx={{ bgcolor: 'primary.dark', color: 'primary.light' }} />
            <Chip label="Data Privacy" size="small" sx={{ bgcolor: 'primary.dark', color: 'primary.light' }} />
          </Box>
        </Paper>

        {/* Platform Features Section */}
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
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.light' }}>
                  Key Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
                  <li>Customizable health metric tracking</li>
                  <li>Visual data representation with historical trends</li>
                  <li>Personalized health score and insights</li>
                </Box>
              </Box>
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
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.light' }}>
                  Key Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
                  <li>AI-powered symptom analysis</li>
                  <li>Medication and appointment reminders</li>
                  <li>Personalized health recommendations</li>
                </Box>
              </Box>
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
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.light' }}>
                  Key Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
                  <li>End-to-end encryption</li>
                  <li>IT Act & DISHA compliant data storage</li>
                  <li>User-controlled data sharing options</li>
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* Additional Feature Cards */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                border: '1px solid rgba(96, 165, 250, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <AccessibilityNewIcon sx={{ fontSize: 48, color: 'primary.light' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                Holistic Wellness Monitoring
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Beyond traditional health metrics, HealthNex monitors sleep quality, activity levels, nutrition, and mental wellbeing to provide a complete picture of your health.
              </Typography>
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.light' }}>
                  Key Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
                  <li>Sleep pattern analysis</li>
                  <li>Nutrition tracking and recommendations</li>
                  <li>Mental wellness check-ins and resources</li>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(145deg, #1E293B, #0F172A)',
                border: '1px solid rgba(96, 165, 250, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <SmartphoneIcon sx={{ fontSize: 48, color: 'primary.light' }} />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
                User-Friendly Interface
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our intuitive design makes health tracking simple and accessible. The clean interface allows you to easily record and monitor your health data with minimal effort.
              </Typography>
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.light' }}>
                  Key Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
                  <li>Intuitive data entry forms</li>
                  <li>Customizable dashboard views</li>
                  <li>Mobile-responsive design</li>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Technology Stack Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.light', mb: 2 }}>
            Our Technology Stack
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 5, maxWidth: 800, mx: 'auto' }}>
            HealthNex is built using modern technologies to ensure performance, reliability, and a great user experience.
          </Typography>
          
          {/* Add devicon stylesheet for tech icons */}
          <Box component="div" dangerouslySetInnerHTML={{ 
            __html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">`
          }} />

          <Grid container spacing={3}>
            {techStack.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TechStackCard {...tech} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Project Timeline Section - REPLACED WITH CUSTOM IMPLEMENTATION */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.light', mb: 5 }}>
            Development Timeline
          </Typography>
          
          <Paper sx={{ 
            p: { xs: 2, md: 4 },
            background: 'linear-gradient(145deg, #1E293B, #0F172A)', 
            border: '1px solid rgba(96, 165, 250, 0.1)',
            borderRadius: 2,
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10} sx={{ mx: 'auto' }}>
                {projectTimeline.map((item, index) => (
                  <MilestoneCard 
                    key={index}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                    isLast={index === projectTimeline.length - 1}
                  />
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Team Members Section */}
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.light', mb: 4 }}>
          Our Team
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <TeamMemberCard {...member} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Project Journey Section */}
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
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Throughout development, we faced and overcame numerous technical challenges, from designing an intuitive user interface to implementing secure data storage and processing. Each obstacle presented a learning opportunity that strengthened our skills and deepened our understanding of software engineering principles.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            The most valuable lesson we learned was the importance of user-centered design. By continuously seeking feedback and iterating on our solutions, we created a platform that truly addresses the needs of its users while maintaining technical excellence.
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

      {/* Future Possibilities Section */}
      <Container maxWidth="md" sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ color: 'primary.light', mb: 2 }}
        >
          Future Possibilities
        </Typography>
        
        <Paper sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          border: '1px solid rgba(96, 165, 250, 0.1)',
          borderRadius: 2
        }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            As we continue to develop HealthNex, we're exploring several promising directions for future expansion:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ color: 'primary.light', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <DataSaverOnIcon sx={{ mr: 1 }} /> Wearable Integration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seamless connectivity with health wearables for real-time monitoring
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ color: 'primary.light', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <IntegrationInstructionsIcon sx={{ mr: 1 }} /> Advanced AI Diagnostics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enhanced machine learning for more accurate health insights
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ color: 'primary.light', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <VerifiedUserIcon sx={{ mr: 1 }} /> Provider Integration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Direct connections with healthcare providers for seamless care
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ color: 'primary.light', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <PsychologyIcon sx={{ mr: 1 }} /> Predictive Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Forecasting potential health issues before they develop
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        {/* <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<SendIcon />}
            href="#contact"
          >
            Share Your Feature Ideas
          </Button>
        </Box> */}
      </Container>

      {/* Contact/Feedback Section */}
      {/* <Container maxWidth="md" sx={{ my: 8 }}>
        <Paper sx={{ 
          p: { xs: 3, md: 5 },
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          border: '1px solid rgba(96, 165, 250, 0.1)',
          borderRadius: 2
        }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.light', mb: 4 }}>
            Get In Touch
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            We value your feedback and would love to hear your thoughts on HealthNex. Feel free to reach out with questions, suggestions, or collaboration opportunities.
          </Typography>
          
          <Box component="form" onSubmit={handleFeedbackSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={feedbackForm.name}
                  onChange={handleFeedbackChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(96, 165, 250, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.light',
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={feedbackForm.email}
                  onChange={handleFeedbackChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(96, 165, 250, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.light',
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  name="message"
                  value={feedbackForm.message}
                  onChange={handleFeedbackChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(96, 165, 250, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.light',
                      },
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                endIcon={<SendIcon />}
                sx={{ px: 4, py: 1 }}
              >
                Send Message
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ mt: 5, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="subtitle1" align="center" sx={{ color: 'primary.light', fontWeight: 'bold', mb: 2 }}>
              Other Ways to Connect
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button startIcon={<i className="devicon-github-original"></i>} 
                component={Link} href="https://github.com/your-org" target="_blank"
                sx={{ color: 'primary.light' }}>
                GitHub
              </Button>
              <Button startIcon={<i className="devicon-linkedin-plain"></i>} 
                component={Link} href="https://linkedin.com/company/your-org" target="_blank"
                sx={{ color: 'primary.light' }}>
                LinkedIn
              </Button>
              <Button startIcon={<EmailIcon />} 
                component={Link} href="mailto:contact@healthnex.edu" 
                sx={{ color: 'primary.light' }}>
                Email
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container> */}
    </Layout>
  );
};

export default About;