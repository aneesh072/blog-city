import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const params = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBlog = async () => {
      await axios
        .get('/api/blogs/' + params.blogId, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setBlog(res.data);
        });
    };

    fetchBlog();
  }, [params.blogId, user]);

  return (
    <div className="blog-post">
      {blog ? (
        <div>
          <h1>{blog.title}</h1>
          <p className="blog-author">
            By: <span>{blog.author}</span>
          </p>
          <p className="blog-date">
            Posted on: <span>{Date.now()}</span>
          </p>
          <p className="blog-category">{blog.category}</p>
          <p className="blog-description">{blog.description}</p>{' '}
          <img src={blog.image.url} alt={blog.image.public_id} />
        </div>
      ) : null}
    </div>
  );
};

export default BlogPost;
