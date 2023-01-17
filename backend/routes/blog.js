const express = require('express');

const {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
} = require('../controller/blogController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all blog routes
router.use(requireAuth);

//add blog
router.post('/', createBlog);

//get all blogs
router.get('/', getBlogs);

//get a single blog
router.get('/:id', getBlog);

//delete a blog
router.delete('/:id', deleteBlog);

//update a blog
router.patch('/:id', updateBlog);

module.exports = router;
