import { Container } from '@mui/system';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add-post" element={<BlogForm />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
