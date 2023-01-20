import React from 'react';
import { Link } from 'react-router-dom';

const BlogTile = ({ blog }) => {
  console.log(blog.author);
  return (
    <Link to={`/blog/${blog._id}`} className="blog-link">
      <div className="blog">
        <div className="blog-image">
          <img src={blog.image.url} alt="  " />
        </div>

        <div className="card-body">
          <h4 className="card-title">{blog.title}</h4>
          <p className="card-text">{blog.description}</p>
          <div>
            <span>{blog.category}</span>
            <p>Author here</p>
          </div>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default BlogTile;
