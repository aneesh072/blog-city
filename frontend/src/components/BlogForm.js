import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const postDetails = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'blog-city');
    data.append('cloud_name', 'dwuo1i1ob');

    fetch(`https://api.cloudinary.com/v1_1/dwuo1i1ob/upload`, {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    const blog = { title, description, author, category, imageUrl };

    const response = fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50%' },
      }}
      marginTop="50px"
      noValidate
    >
      <h1 style={{ textAlign: 'center' }}>Add Post</h1>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <TextField
          type="text"
          id="filled-basic"
          label="Title..."
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="text"
          id="filled-multiline-static"
          label="Description..."
          multiline
          rows={12}
          variant="filled"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="text"
          id="filled-basic"
          label="Category / Tag"
          variant="filled"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Typography display="flex">Add Image</Typography>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <Button
          variant="contained"
          sx={{
            p: 2,
            width: '50%',
          }}
          onClick={postDetails}
        >
          Upload
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogForm;
