// PostContextHelpers.tsx

import React, { createContext } from "react";
import { PostType } from "../utils/Types";

type PostContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

const PostContext = createContext<PostContextType>({
  posts: [],
  setPosts: () => {}, // default empty function
});

const usePostContext = (): PostContextType => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

export { PostContext, usePostContext };
