import React, { createContext,} from "react";
type CommentType = {
  id: number;
  content: string;
  author: string;
  date: string;
  isOwner: boolean;
};

type PostType = {
  id:number;
  name: string;
  photo: string;
  date: string;
  content: string;
  likes: number;
  bookmarks: number;
 
  isOwner: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: CommentType[]
};
type PostContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<any>>;
};
const PostContext = createContext<PostContextType>({
  posts: [],
  setPosts: () => {}, // default empty function
});
export const PostProvider: React.FC<React.PropsWithChildren<{value: PostContextType}>> = ({ children, value } : any) => {
  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};


export const usePostContext = (): PostContextType => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};


type UserType = {
  id: number;
  name: string;
  email: string;
  bio: string;
  photo: string;
 };
 
 type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
 };
 
 const UserContext = React.createContext<UserContextType>({
  user: {
    id: 0,
    name: '',
    email: '',
    bio: '',
    photo: ''
  },
  setUser: () => {},
 });
 
 export const UserProvider: React.FC<React.PropsWithChildren<{value: UserContextType}>> = ({ children, value } : any) => {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
 };
 
 export const useUserContext = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
 };