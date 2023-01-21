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

  const [name, setName] = useState([]);

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
      }
    };
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
      fetchBlog();
      fetchUsers();
    }
  }, [params.blogId, dispatch, user]);

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
      await fetch('/api/blogs/' + params.blogId, {
        method: 'PATCH',
        body: JSON.stringify(blog),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
          accept="image/png, image/jpeg"
          onChange={handleImage}
          id="add-file-button"
        />
      </form>

      <button onClick={postDetails}>Update</button>
    </div>
  );
};

export default UpdateBlog;
