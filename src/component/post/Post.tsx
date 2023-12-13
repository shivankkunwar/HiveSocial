import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';

import { LikeOutlined, BookOutlined, EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { usePostContext } from '../../../Context/context';
// A function component for the post
const Post = ({ post ,id}: any) => {
    const [Liked, setIsLiked] = useState(post.isLiked);
    const [Bookmarked, setIsBookmarked] = useState(post.isBookmarked);
    const {posts, setPosts}= usePostContext();
    const handleLikeClick = () => {
        setIsLiked(!Liked);
        const updatedPosts = posts.map((p: any) => {
            if (p.id === post.id) {
              return { ...p, isLiked: !Liked };
            }
            return p;
          });
          setPosts(updatedPosts);
    };

    const handleBookmarkClick = () => {
        setIsBookmarked(!Bookmarked);
        
        const updatedPosts = posts.map((p: any) => {
            if (p.id === post.id) {
              return { ...p, isBookmarked: !isBookmarked };
            }
            return p;
          });
          setPosts(updatedPosts);
    };

    const handleDeleteClick = () => {
        // Filter the posts state to remove the post with the given id
        const updatedPosts = posts.filter((p) => p.id !== post.id);
        setPosts(updatedPosts);
      };
    // Destructure the post object
    const { name, photo, date, content, likes, bookmarks, comments, isOwner, isLiked, isBookmarked } = post;

    // Define the actions for the post
    const actions = [
        <LikeOutlined key="like" onClick={handleLikeClick} style={{ color: Liked ? 'red' : 'inherit',fontSize:"1rem" }} />, // Like button
        <span>{Liked ? likes + 1 : likes}</span>, // Like count
        <BookOutlined key="bookmark" onClick={handleBookmarkClick} style={{ color: Bookmarked? 'red' : 'inherit',fontSize:"1rem" }} />, // Bookmark button
        <span>{Bookmarked ? bookmarks + 1 : bookmarks}</span>, // Bookmark count
        <CommentOutlined key="comment" style={{ fontSize:"1rem" }} />, // Comment button
        <span>{comments}</span>,
    ];

    // If the post is owned by the user, add update and delete buttons
    if (isOwner) {
        actions.push(
            <EditOutlined key="edit" />, // Update button
            <DeleteOutlined key="delete" onClick={handleDeleteClick} /> // Delete button
        );
    }

    // Return the ProCard component for the post
    return (
        <ProCard
            style={{margin:"1rem", borderRadius:"1rem", fontSize:"0.8rem"}}
            colSpan={8} // Grid layout
            title={<div><img src={photo} alt={name} />{" "}{name}</div>} // Name and photo of the post owner
            extra={date} // Date of the post
            actions={actions} // Buttons for the post
        >
           <p style={{fontSize:"1.2rem"}}>{content}</p> 
        </ProCard>
    );
};

export default Post;