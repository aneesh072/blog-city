import React, { useState } from 'react';

import { TextField, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/system';
import Grid from '@mui/material/Grid';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  console.log(title);
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50%' },
      }}
      marginTop="50px"
      noValidate
    >
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <TextField
          id="filled-basic"
          label="Title..."
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
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
          id="filled-basic"
          label="Category / Tag"
          variant="filled"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Typography display="flex">Add Image</Typography>
        <input type="file" onChange={(e) => setImageUrl(e.target.files[0])} />

        <Button
          variant="contained"
          sx={{
            p: 2,
            width: '50%',
          }}
        >
          Upload
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogForm;
