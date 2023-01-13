const mongoose = require('mongoose');

const Blog = require('../model/BlogModel');

//create blog
const createBlog = async (req, res) => {
  const { title, description, author, category } = req.body;

  try {
    const blog = await Blog.create({
      title,
      description,
      category,
      author,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

//get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No blog found' });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: 'No blog found' });
  }
  res.status(200).json(blog);
};

//delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No blog found' });
  }
  const blog = await Blog.findByIdAndDelete({ _id: id });

  if (!blog) {
    return res.status(404).json({ error: 'No blog found' });
  }
  res.status(200).json(blog);
};

//update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No blog found' });
  }

  const blog = await Blog.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!blog) {
    return res.status(404).json({ error: 'No blog found' });
  }
  res.status(200).json(blog);
};

module.exports = { createBlog, getBlog, getBlogs, deleteBlog, updateBlog };
