// PostContext.tsx

import React from "react";
import { PostType } from "../utils/Types";
import { PostContext } from "./PostContextUtils";


type PostContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};


export const PostProvider: React.FC<React.PropsWithChildren<{value: PostContextType}>> = ({ children, value }) => {
  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
