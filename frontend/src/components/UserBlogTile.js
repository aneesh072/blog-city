import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdOutlineSystemUpdateAlt } from 'react-icons/md';

import { useBlogContext } from '../hooks/useBlogContext';
import { useAuthContext } from '../hooks/useAuthContext';

const UserBlogTile = ({ blog }) => {
  const { user } = useAuthContext();
  const { dispatch } = useBlogContext();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    const response = await fetch('/api/blogs/' + blog._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BLOG', payload: json });
    }
  };
  return (
    <div className="blog">
      <div className="blog-image">
        <img src={blog.image.url} alt="  " />
      </div>

      <div className="card-body">
        <Link to={`/blog/${blog._id}`} className="blog-link">
          <h4 className="card-title">{blog.title}</h4>
          <p className="card-text">{blog.description}</p>
          <span>{blog.category}</span>
        </Link>
        <div className="blog-action">
          <Link to={`/update-post/${blog._id}`}>
            <button id="update">
              <MdOutlineSystemUpdateAlt />
            </button>
          </Link>

          <button id="delete" onClick={handleDelete}>
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBlogTile;
