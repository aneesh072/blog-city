import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBlogContext } from '../hooks/useBlogContext';
import { useNavigate, Link, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useBlogContext();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch('/api/blogs/' + params.blogId, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (response.ok) {
        setTitle(json.title);
        setDescription(json.description);
        setCategory(json.category);
        setImageUrl(json.imageUrl);
      }
    };
    if (user) {
      fetchBlog();
    }
  }, [params.blogId, dispatch, user]);

  const postDetails = async (e) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'blog-city');
    data.append('cloud_name', 'dwuo1i1ob');

    fetch(`https://api.cloudinary.com/v1_1/dwuo1i1ob/upload`, {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    const blog = { title, description, author, category, imageUrl };

    fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate('/userBlog');
  };

  return (
    <div className="add-blog-form">
      <h1 style={{ textAlign: 'center' }}>Update Post</h1>
      <form>
        <label>Title: </label>
        <input
          type="text"
          placeholder="Title.."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>Description:</label>
        <textarea
          cols="70"
          rows="10"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>

        <label>Category</label>
        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <label>Add Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          id="add-file-button"
        />
      </form>

      <button onClick={postDetails}>Update</button>
    </div>
  );
};

export default UpdateBlog;
