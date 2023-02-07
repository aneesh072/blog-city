import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const params = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBlog = async () => {
      await axios
        .get(
          'https://blog-city-backend.onrender.com/api/blogs/' + params.blogId,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          setBlog(res.data);
        });
    };

    fetchBlog();
  }, [params.blogId, user]);
  console.log(blog);

  return (
    <div className="blog-post">
      {blog ? (
        <div>
          <h1>{blog.title}</h1>
          <p className="blog-author">
            By: <span>{blog.author}</span>
          </p>
          <p className="blog-date">
            Posted on:{' '}
            <span>
              {' '}
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </span>
          </p>
          <p className="blog-category">{blog.category}</p>{' '}
          <img src={blog.image.url} alt={blog.image.public_id} />
          <p className="blog-description">{blog.description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default BlogPost;
