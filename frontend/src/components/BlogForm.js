import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const [name, setName] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      json.filter((fName) => {
        if (user.email === fName.email) {
          setName(fName.name);
          setAuthor(fName.name);
        }
        return fName;
      });
    };
    if (user) {
      fetchUsers();
    }
  }, [user]);

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const postDetails = async (e) => {
    e.preventDefault();
    try {
      const blog = { title, description, author, category, image };
      console.log(blog);
      await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(blog),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  };

  console.log(author);

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
          accept="image/png, image/jpeg"
          onChange={handleImage}
          id="add-file-button"
        />
      </form>

      <button onClick={postDetails}>Upload</button>
    </div>
  );
};

export default BlogForm;
