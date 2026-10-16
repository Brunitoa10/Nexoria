"use client";

import { ExpandMore, PlayArrow } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, Collapse, IconButton, Typography } from "@mui/material";

import { useToggle } from "@/hooks/useToggle";
import type { ContentItem } from "@/types/content";

import { cardSx, expandIconSx, mediaSx, titleSx } from "./ContentCard.styles";

interface ContentCardProps {
  item: ContentItem;
}

const NO_DESCRIPTION = "Sin descripción disponible.";

export default function ContentCard({ item }: ContentCardProps) {
  const { title, description, imageUrl } = item;
  const { isOpen: expanded, toggle } = useToggle();

  return (
    <Card sx={cardSx}>
      <CardMedia component="img" image={imageUrl} alt={title} loading="lazy" sx={mediaSx} />

      <CardContent>
        <Typography variant="h6" component="h3" title={title} sx={titleSx}>
          {title}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ mt: "auto" }}>
        <IconButton color="primary" aria-label={`Reproducir ${title}`}>
          <PlayArrow />
        </IconButton>
        <IconButton
          onClick={toggle}
          color="primary"
          aria-expanded={expanded}
          aria-label={expanded ? "Ver menos" : "Ver más"}
        >
          <ExpandMore sx={expandIconSx(expanded)} />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 2 }}>
          <Typography variant="body2">{description || NO_DESCRIPTION}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
