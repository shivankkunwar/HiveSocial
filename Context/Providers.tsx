import React, {createContext} from "react";
import {UserContext} from "./UserContextUtils"
import { UserType } from "../utils/Types";
import { PostType } from "../utils/Types";
   type UserContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
   };
   export const UserProvider: React.FC<React.PropsWithChildren<{value: UserContextType}>> = ({ children, value } ) => {
    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    );
   };

type PostContextType = {
    posts: PostType[];
    setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  };
  const PostContext = createContext<PostContextType>({
    posts: [],
    setPosts: () => {}, // default empty function
  });
  export const PostProvider: React.FC<React.PropsWithChildren<{value: PostContextType}>> = ({ children, value }) => {
    return (
      <PostContext.Provider value={value}>
        {children}
      </PostContext.Provider>
    );
  };