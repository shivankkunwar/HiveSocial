

import ProCard from '@ant-design/pro-card';
import { message } from "antd"
import Post from '../component/post/Post';
import { usePostContext } from '../../Context/context';
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
  comments:CommentType[]
};
function Home() {
  const{ posts, setPosts}= usePostContext();

  console.log(posts)
  
  // Define a function to handle the submit event of the post form
  const handleSubmit = async (event: any) => {
    // Prevent the default behavior of the form
    event.preventDefault();

    // Get the post content from the form
    const content = event.target.elements.content.value;

    // Validate the post content
    if (!content || content.length > 200) {
      message.error('Please enter a valid post content (max length: 200 characters).');

      return;
    }

    // Create a new post object with some mock data
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const newPost: PostType = {
      id:Math.random(),
      name: 'user',
      photo: `https://robohash.org/hassc1?size=50x50  `,
      date: dateString,
      content: content,
      likes: 0,
      bookmarks: 0,
      
      isOwner: true,
      isLiked: false,
      isBookmarked: false,
      comments: [],
      
    };
    
    // Add the new post to the posts array
    setPosts((prevState : PostType[]) => {
      const newPosts = [newPost, ...prevState];
      
      return newPosts;
    });

    // Clear the form input
    event.target.reset();
  };

  // Return the ProCard component for the home page
  return (
    <ProCard split="vertical" style={{ display: "flex", background: "linear-gradient(#FDFDFD,#F5F5F5, #F5F5F5)" }}>
      <ProCard title="All posts" colSpan="70%" style={{ display: "flex", background: "linear-gradient(#FDFDFD,#F5F5F5, #F5F5F5)" }}>
        {posts.map((post : PostType, index: number) => (
          <Post key={post.id} post={post} id={index} />
        ))}
      </ProCard>
      <ProCard title="Create Post" colSpan="30%" style={{ background: "linear-gradient(#FDFDFD, #F5F5F5)", }} >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <textarea name="content" placeholder="Enter your post content here (max length: 200 characters)" style={{ width: "100%", height: "10vh" }} />
          <button type="submit" style={{ maxWidth: "70px", backgroundColor: '#1890ff', color: "white", fontSize: "1rem", borderRadius:"1rem" }}>Post</button>
        </form>
      </ProCard>
    </ProCard>
  )
}

export default Home;