import React, { useEffect, useState } from 'react';

import BlogTile from '../components/BlogTile';
import Pagination from 'react-paginate';
import { useBlogContext } from '../hooks/useBlogContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { blogs, dispatch } = useBlogContext();

  const { user } = useAuthContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const [query, setQuery] = useState('');

  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = blogs.slice(indexOfFirstData, indexOfLastData);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_BLOG', payload: json });
      }
    };
    if (user) {
      fetchBlogs();
    }
  }, [/* user, dispatch, blogs, currentPage, perPage */]);

  return (
    <div className="details">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div className="blog-list">
        {currentData
          .filter((post) => {
            if (query === '') {
              return post;
            } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
              return post;
            }
          })
          .map((blog) => (
            <BlogTile blog={blog} key={blog._id} />
          ))}
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
