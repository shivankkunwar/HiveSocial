
export type CommentType = {
    id: number;
    content: string;
    author: string;
    date: string;
    isOwner: boolean;
  };
  
  export type PostType = {
    id: number;
    name: string;
    photo: string;
    date: string;
    content: string;
    likes: number;
    bookmarks: number;
    isOwner: boolean;
    isLiked: boolean;
    isBookmarked: boolean;
    comments: CommentType[];
  };
  
  export type UserType = {
    id: number;
    name: string;
    email: string;
    bio: string;
    photo: string;
  };
  