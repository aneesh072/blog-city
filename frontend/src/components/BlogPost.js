import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const BlogPost = () => {
  const [blog, setBlog] = useState({});
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch('/api/blogs/' + params.blogId);
      const json = await response.json();
      setBlog(json);
    };
    fetchBlog();
  }, [params.blogId]);

  return (
    <div className="blog-post">
      <h1>{blog.title}</h1>
      <p className="blog-author">
        By: <span>{blog.author}</span>
      </p>
      <p className="blog-date">
        Posted on: <span>{Date.now()}</span>
      </p>
      <p className="blog-category">{blog.category}</p>

      <img src={blog.imageUrl} alt={blog.title} />

      <p className="blog-description">{blog.description}</p>
    </div>
  );
};

export default BlogPost;
