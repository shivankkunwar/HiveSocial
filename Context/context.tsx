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
