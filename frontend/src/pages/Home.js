import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogTile from '../components/BlogTile';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blogs').then((res) => {
        return res.data;
      });
      setBlogs(response);
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={1}>
        {blogs &&
          blogs.map((blog) => (
            <Grid
              item
              alignItems="center"
              sx={{ margin: '0 auto' }}
              xs={8}
              lg={4}
              xl={3}
              key={blog._id}
            >
              <BlogTile blog={blog} key={blog._id} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;

//    {blogs.map((blog) => <BlogTile blog={blog} key={blog._id} />)}
