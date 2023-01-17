import { Container } from '@mui/system';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import BlogPost from './components/BlogPost';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/Login';

const App = () => {
  const name = '';
  return (
    <BrowserRouter>
      {name ? <Navbar /> : null}
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/add-post" element={<BlogForm />}></Route>
        <Route path="/blog/:blogId" element={<BlogPost />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
