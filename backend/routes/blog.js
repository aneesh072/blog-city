const express = require('express');

const {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
} = require('../controller/blogController');

const router = express.Router();

//add blog
router.post('/', createBlog);

//get all blogs
router.get('/', getBlogs);

//get a single blog
router.get('/:id', getBlogs);

//delete a blog
router.delete('/:id', deleteBlog);

//update a blog
router.patch('/:id', updateBlog);

module.exports = router;
