"use client";

import { ExpandMore, PlayArrow } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ContentCard({ title, description, imageUrl }: ContentCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: 'rgba(128, 2, 2, 0.47)',
        color: 'white',
        borderRadius: 8,
        boxShadow: '0 6px 15px rgb(255, 0, 0)',
        transition: 'all 0.3s ease',
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: '0 12px 24px rgb(255, 0, 0)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        sx={{
            height: 200,
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            width: '100%',
          }}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color="primary" aria-label="reproducir">
          <PlayArrow />
        </IconButton>
        <IconButton onClick={handleExpandClick}  color="primary" aria-expanded={expanded} aria-label="mostrar más" >
          <ExpandMore
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: 'block', paddingTop: 2 }}>
          <Typography >{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
