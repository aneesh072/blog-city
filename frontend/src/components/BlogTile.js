import React from 'react';
import { Link } from 'react-router-dom';

const BlogTile = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`} className="blog-link">
      <div className="blog">
        <div className="blog-image">
          <img src={blog.image.url} alt="  " />
        </div>

        <div className="card-body">
          <h4 className="card-title">{blog.title}</h4>
          <p className="card-text">{blog.description}</p>
          <span>{blog.category}</span>
          <h2>{blog.author}</h2>
        </div>
        <div>
          <p>{blog.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogTile;
