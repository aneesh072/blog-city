import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Chip } from '@mui/material';


const BlogTile = ({ blog }) => {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 545 }} lg={{ minWidth: 200 }}>
      <CardActionArea>
        <CardMedia component="img" height="auto" image={blog.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
            variant="body1"
          >
            {blog.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Chip label={blog.category} />
      </CardActions>
    </Card>
  );
};

export default BlogTile;
