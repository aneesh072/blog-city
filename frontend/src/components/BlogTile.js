import React from 'react';

const BlogTile = ({ blog }) => {
  return (
    <div className="blog">
      <img src={blog.imageUrl} alt="  " />
      <div class="card-body">
        <h4 class="card-title">{blog.title}</h4>
        <p class="card-text">{blog.description}</p>
        <span>{blog.category}</span>
      </div>
    </div>
  );
};

export default BlogTile;
