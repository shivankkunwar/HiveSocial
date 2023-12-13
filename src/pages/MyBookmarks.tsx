
import ProCard from '@ant-design/pro-card';
import Post from '../component/post/Post';
import { usePostContext } from '../../Context/context';
function MyBookmarks() {
  const {posts, } = usePostContext();
  
  console.log(posts)
  const bookmarkedPosts = posts.filter((post : any)=> post.isBookmarked);
  
 
  return (
    <ProCard split="vertical" style={{ display: "flex", background: "linear-gradient(#FDFDFD,#F5F5F5, #F5F5F5)" }}>
      <ProCard title="Bookmarked posts" colSpan="70%" style={{ display: "flex", background: "linear-gradient(#FDFDFD,#F5F5F5, #F5F5F5)" }}>
        {bookmarkedPosts.map((post : any, index : number) => (
          <Post key={post.id} post={post} id={index} />
        ))}
      </ProCard>
    </ProCard>
  )
}

export default MyBookmarks;