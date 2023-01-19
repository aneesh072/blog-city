import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import BlogPost from './components/BlogPost';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';
import UserBlogList from './components/UserBlogList';
import UpdateBlog from './components/UpdateBlog';
import Users from './pages/Users';

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      {user ? <Navbar /> : null}
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>

        <Route
          path="/add-post"
          element={user ? <BlogForm /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/blog/:blogId"
          element={user ? <BlogPost /> : <Navigate to="/login" />}
        ></Route>

        <Route
          path="/userBlog"
          element={user ? <UserBlogList /> : <Navigate to="/login" />}
        ></Route>

        <Route
          path="/update-post/:blogId"
          element={user ? <UpdateBlog /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
