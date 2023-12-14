
import Login from "./component/auth/Auth"
import {useState, useEffect} from "react"
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from "react-router-dom";
import { Button } from 'antd';
import BasicLayout from '@ant-design/pro-layout';
import Home from './pages/Home';
import MyLikes from './pages/MyLikes';
import MyBookmarks from './pages/MyBookmarks';
import MyPosts from './pages/MyPosts';
import MyProfile from './pages/MyProfile';
import { PostProvider } from "../Context/context.tsx";
import { UserProvider  } from '../Context/context.tsx';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
    bio: 'A short bio about you.',
    photo: 'https://robohash.org/hassc1?size=50x50'
  });
  const handleLogout = () => {
    
    
  };
 
 

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
    <UserProvider value={{ user, setUser }}>
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
                rightContentRender={() => <Link to = "/"><Button onClick={handleLogout}>Logout</Button></Link>}

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
    </UserProvider>
  )
}

export default App
