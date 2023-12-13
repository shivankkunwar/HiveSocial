
import Login from "./component/auth/Auth"
import {useState, useEffect} from "react"
import { BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom";

import BasicLayout from '@ant-design/pro-layout';
import Home from './pages/Home';
import MyLikes from './pages/MyLikes';
import MyBookmarks from './pages/MyBookmarks';
import MyPosts from './pages/MyPosts';
import MyProfile from './pages/MyProfile';
import { PostProvider } from "../Context/context.tsx";
import './App.css'
type PostType = {
  id:number;
  name: string;
  photo: string;
  date: string;
  content: string;
  likes: number;
  bookmarks: number;
  comments: number;
  isOwner: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
};
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/data")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched data:', data);
          setPosts(data[0].user);
          console.log('Posts state after fetch:', posts);
        });
    } catch (error: any) {
      console.log('Fetch error:', error.message);
    }
  }, [])
  
  return (
    <PostProvider value={{ posts , setPosts}}>

   
    
      <Router>
        <Routes>
        <Route
            path="/*"
            element={
              <BasicLayout
                menuDataRender={() => [
                  { path: '/home', name: 'Home' },
                  { path: '/my-likes', name: 'My Likes' },
                  { path: '/my-bookmarks', name: 'My Bookmarks' },
                  { path: '/my-posts', name: 'My Posts' },
                  { path: '/my-profile', name: 'My Profile' },
                ]}
                menuItemRender={(item, dom) => {
                  const path = item.path || '/';
                  const isActiveStyle = { color: '#1890ff' };
                  return <NavLink to={path} style= { ({isActive})=>isActive? isActiveStyle : {}} >{dom}</NavLink>;
                }}
                
              >
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/my-likes" element={<MyLikes  />} />
                  <Route path="/my-bookmarks" element={<MyBookmarks  />} />
                  <Route path="/my-posts" element={<MyPosts />} />
                  <Route path="/my-profile" element={<MyProfile  />} />
                </Routes>
              </BasicLayout>
            }
          />
          <Route key="login" path="/" element={<Login />} />
          
        </Routes>
      </Router>

 
    </PostProvider>
  )
}

export default App
