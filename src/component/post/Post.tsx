import React,{ useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { Modal, Button, Input, Avatar , List, message} from 'antd';
import { LikeOutlined, BookOutlined, EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { usePostContext } from '../../../Context/PostContextUtils';
import { Comment } from '@ant-design/compatible';
// A function component for the post
type CommentType = {
    id: number;
    content: string;
    author: string;
    date: string;
    isOwner: boolean;
};
type PostType = {
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

type Props = {
    post: PostType;
    id:number;
};

const Post: React.FC<Props> = ({ post }) => {
    const [Liked, setIsLiked] = useState(post.isLiked);
    const [Bookmarked, setIsBookmarked] = useState(post.isBookmarked);
    const { posts, setPosts } = usePostContext();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [confirmingEditCommentId, setConfirmingEditCommentId] = useState<number | null>(null);
    const [originalCommentContent, setOriginalCommentContent] = useState('');


    const handleCommentsClick = () => {
        setIsCommentsVisible(!isCommentsVisible);
    };
    const handleCommentSubmit = async (event:  React.FormEvent) => {
        event.preventDefault();

        // Get the comment content from the state
        const content = newComment;

        // Validate the comment content
        if (!content) {
            message.error('Please enter a valid comment.');
            return;
        }

        // Create a new comment object
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const newCommentObj: CommentType = {
            id: Math.random(),
            content: content,
            author: 'user',  // Replace 'user' with the current user's name
            date: dateString,
            isOwner: true
        };

        // Add the new comment to the current post's comments array
        setPosts((prevState: PostType[]) => {
            return prevState.map((p) => {
                if (p.id === post.id) {
                    const comments = Array.isArray(p.comments) ? p.comments : [];
                    return { ...p, comments: [...comments, newCommentObj] };
                }
                return p;
            });
        });

        // Clear the form input
        setNewComment('');
    };
    const handleDeleteComment = (commentId: number) => {
        Modal.confirm({
            title: 'Are you sure delete this comment?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setPosts((prevState: PostType[]) => {
                    return prevState.map((p) => {
                        if (p.id === post.id) {
                            return {
                                ...p,
                                comments: p.comments.filter(comment => comment.id !== commentId)
                            };
                        }
                        return p;
                    });
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleUpdateComment = () => {
        Modal.confirm({
            title: 'Confirm Edit',
            content: 'Are you sure you want to edit this comment?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                setPosts((prevState: PostType[]) => {
                    return prevState.map((p) => {
                        if (p.id === post.id) {
                            return {
                                ...p,
                                comments: p.comments.map(comment => comment.id === editingCommentId ? { ...comment, content: newCommentContent } : comment)
                            };
                        }
                        return p;
                    });
                });
                setEditingCommentId(null);
                setConfirmingEditCommentId(null);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleLikeClick = () => {
        setIsLiked(!Liked);
        const updatedPosts = posts.map((p: PostType) => {
            if (p.id === post.id) {
                return { ...p, isLiked: !Liked };
            }
            return p;
        });
        setPosts(updatedPosts);
    };

    const handleBookmarkClick = () => {
        setIsBookmarked(!Bookmarked);

        const updatedPosts = posts.map((p: PostType) => {
            if (p.id === post.id) {
                return { ...p, isBookmarked: !isBookmarked };
            }
            return p;
        });
        setPosts(updatedPosts);
    };

    const handleDeleteClick = () => {
        Modal.confirm({
            title: 'Are you sure delete this post?',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                const updatedPosts = posts.filter((p) => p.id !== post.id);
                setPosts(updatedPosts);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleEditComment = (commentId: number) => {
        const commentToEdit = post.comments.find((comment: CommentType) => comment.id === commentId);
        if (commentToEdit) {
            setOriginalCommentContent(commentToEdit.content); // Save the original content
            setNewCommentContent(commentToEdit.content);
        }
        setEditingCommentId(commentId);
        setConfirmingEditCommentId(commentId);
    };
    const handleEditClick = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        const updatedPosts = posts.map((p) => {
            if (p.id === post.id) {
                return { ...p, date: dateString, content: editedContent };
            }
            return p;
        });
        setPosts(updatedPosts);
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // Destructured the post object
    const { name, photo, date, content, likes, bookmarks, isOwner, isBookmarked } = post;

    // Defined the actions for the post
    const actions = [
        <LikeOutlined key="like" onClick={handleLikeClick} style={{ color: Liked ? 'red' : 'inherit', fontSize: "1rem" }} />, // Like button
        <span>{Liked ? likes + 1 : likes}</span>, // Like count
        <BookOutlined key="bookmark" onClick={handleBookmarkClick} style={{ color: Bookmarked ? 'red' : 'inherit', fontSize: "1rem" }} />, // Bookmark button
        <span>{Bookmarked ? bookmarks + 1 : bookmarks}</span>, // Bookmark count
        <CommentOutlined key="comments" onClick={handleCommentsClick} style={{ fontSize: "1rem" }} />, // Comment button
        <span>{post.comments ? post.comments.length : 0}</span> // Comment count
    ];

    // If the post is owned by the user, add update and delete buttons
    if (isOwner) {
        actions.push(
            <EditOutlined key="edit" onClick={handleEditClick} />, // Update button
            <DeleteOutlined key="delete" onClick={handleDeleteClick} /> // Delete button
        );
    }

    const commentList = post.comments?.map((comment: CommentType) => (
        <li key={comment.id} style={{ display: "flex", gap: "1rem" }}>
           
            <Comment
                actions={comment.isOwner ? [
                    <span key="edit" onClick={() => handleEditComment(comment.id)}>Edit</span>,
                    <span key="delete" onClick={() => handleDeleteComment(comment.id)}>Delete</span>
                ] : []}
                author={comment.author}
                avatar={<Avatar src={`https://robohash.org/hassc${comment.id}?size=50x50`} />}
                content={
                    editingCommentId === comment.id ? (
                        <Input value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} />
                    ) : (
                        comment.content
                    )
                }
                datetime={comment.date}
            />
            {editingCommentId === comment.id && confirmingEditCommentId === comment.id && (
                <div style={{display:"flex", alignItems:"center",gap:"1rem"}}>
                    <Button type="primary" style={{  }} onClick={handleUpdateComment}>update</Button>
                    <Button onClick={() => {
                        setConfirmingEditCommentId(null);
                        setEditingCommentId(null); // added this line
                        setNewCommentContent(originalCommentContent);
                    }}>Cancel</Button>
                </div>
            )}
        </li>

    ));
    // Return the ProCard component for the post
    return (
        <div data-testid="post">
            <ProCard
                style={{ margin: "1rem", borderRadius: "1rem", fontSize: "0.8rem" }}
                colSpan={8} // Grid layout
                title={<div><img src={photo} alt={name} />{" "}{name}</div>} // Name and photo of the post owner
                extra={date} // Date of the post
                actions={actions} // Buttons for the post
            >
                <p style={{ fontSize: "1.2rem" }}>{content}</p>
                {isCommentsVisible && (
                    <div>
                        <List dataSource={commentList} renderItem={(item) => <li>{item}</li>} />
                        <form onSubmit={handleCommentSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            <textarea name="comment" placeholder="Enter your comment here" style={{ width: "100%", height: "10vh" }} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            <button type="submit" style={{ maxWidth: "90px", backgroundColor: '#1890ff', color: "white", fontSize: "1rem", borderRadius: "1rem" }}>Comment</button>
                        </form>
                    </div>
                )}
            </ProCard>
            <Modal title="Edit Post" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="OK"
                cancelText="Cancel">
                <Input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
            </Modal>

        </div>


    );
};

export default Post;