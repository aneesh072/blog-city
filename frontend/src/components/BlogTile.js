import React from 'react';

const BlogTile = ({ blog }) => {
  return (
    <div className="blog">
      <img src={blog.imageUrl} alt="  " />
      <div className="card-body">
        <h4 className="card-title">{blog.title}</h4>
        <p className="card-text">{blog.description}</p>
        <span>{blog.category}</span>
      </div>
    </div>
  );
};

export default BlogTile;
