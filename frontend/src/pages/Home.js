import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogTile from '../components/BlogTile';
import Pagination from 'react-paginate';
import { useBlogContext } from '../hooks/useBlogContext';

const Home = () => {
  const { blogs, dispatch } = useBlogContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected + 1);
  };

  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = blogs.slice(indexOfFirstData, indexOfLastData);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blogs').then((res) => {
        return res.data;
      });

      dispatch({ type: 'SET_BLOG', payload: response });
    };

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="details">
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="blog-list">
        {currentData &&
          currentData.map((blog) => <BlogTile blog={blog} key={blog._id} />)}
      </div>
      <Pagination
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(blogs.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Home;

//    {blogs.map((blog) => <BlogTile blog={blog} key={blog._id} />)}
