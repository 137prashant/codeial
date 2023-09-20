import { createContext } from 'react';

import { UseProvidePosts } from '../hooks';

const initialState = {
  post: [],
  loading: true,
  addPostToState: () => {},
  addCommentToPost: () => {},
};

export const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
  const post = UseProvidePosts();

  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};
