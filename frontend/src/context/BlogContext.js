import { createContext, useReducer } from 'react';

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOG':
      return { blogs: action.payload };
    case 'DELETE_BLOG':
      return {
        blogs: state.blogs.filter((b) => b._id !== action.payload._id),
      };
    case 'CREATE_BLOG':
      return {
        blogs: [action.payload, ...state.blogs],
      };
    default:
      return state;
  }
};

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: [],
  });
  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
