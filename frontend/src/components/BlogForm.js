import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      json.map((names) => {
        if (names.email === user.email) {
          setAuthor(names.name);
        }
        return names;
      });
    };
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const postDetails = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'blog-city');
    data.append('cloud_name', 'dwuo1i1ob');

    const blog = { title, description, author, category, imageUrl };

    await (`https://api.cloudinary.com/v1_1/dwuo1i1ob/upload`,
    {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .then(
        await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify(blog),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        })
      )
      .catch((err) => {
        console.log(err);
      });

    /*     const response = fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }); */
  };

  console.log(image, imageUrl);

  return (
    <div className="add-blog-form">
      <h1 style={{ textAlign: 'center' }}>Add Post</h1>
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

      <button onClick={postDetails}>Upload</button>
    </div>
  );
};

export default BlogForm;
