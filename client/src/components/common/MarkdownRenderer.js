import React from 'react';
import { Typography, Box } from '@mui/material';

/**
 * Simple Markdown renderer component that converts markdown-like text to formatted JSX
 * This is a basic implementation that handles common markdown patterns
 * For a more complete solution, consider adding the react-markdown library:
 * npm install react-markdown
 */
const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  
  // Split the content into lines for processing
  const lines = content.split('\n');
  
  // Process each line and convert markdown-like syntax to JSX
  const processedContent = lines.map((line, index) => {
    // Handle headers (# Header)
    if (line.startsWith('# ')) {
      return <Typography key={index} variant="h4" gutterBottom>{line.substring(2)}</Typography>;
    }
    if (line.startsWith('## ')) {
      return <Typography key={index} variant="h5" gutterBottom>{line.substring(3)}</Typography>;
    }
    if (line.startsWith('### ')) {
      return <Typography key={index} variant="h6" gutterBottom>{line.substring(4)}</Typography>;
    }
    
    // Handle bold text (**bold**)
    let processedLine = line;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const boldMatches = [...line.matchAll(boldRegex)];
    
    if (boldMatches.length > 0) {
      // Create an array of text parts and bold elements
      const parts = [];
      let lastIndex = 0;
      
      for (const match of boldMatches) {
        // Add the text before the bold part
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        
        // Add the bold part
        parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>);
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add any remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      return (
        <Typography key={index} variant="body1" paragraph>
          {parts.map((part, i) => (
            <React.Fragment key={i}>{part}</React.Fragment>
          ))}
        </Typography>
      );
    }
    
    // Handle bullet points (- item)
    if (line.trim().startsWith('- ')) {
      return (
        <Box key={index} sx={{ display: 'flex', ml: 2, mb: 1 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>•</Typography>
          <Typography variant="body1">{line.trim().substring(2)}</Typography>
        </Box>
      );
    }
    
    // Handle numbered lists (1. item)
    const numberedListRegex = /^\d+\.\s(.+)$/;
    const numberedMatch = line.trim().match(numberedListRegex);
    if (numberedMatch) {
      return (
        <Box key={index} sx={{ display: 'flex', ml: 2, mb: 1 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>{line.trim().split('.')[0]}.</Typography>
          <Typography variant="body1">{numberedMatch[1]}</Typography>
        </Box>
      );
    }
    
    // Handle empty lines
    if (line.trim() === '') {
      return <Box key={index} sx={{ height: '0.5em' }} />;
    }
    
    // Default: regular paragraph
    return <Typography key={index} variant="body1" paragraph>{line}</Typography>;
  });
  
  return <Box>{processedContent}</Box>;
};

export default MarkdownRenderer;