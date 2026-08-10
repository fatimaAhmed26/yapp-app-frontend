import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState , useEffect} from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import UserList from "./pages/UserList"
import * as postService from './services/post'
import PostForm from "./pages/PostFrom"
import PostList from "./pages/PostList"
import PostDetails from "./pages/PostDetails"
import * as commentService from "./services/comment"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate= useNavigate()
const [posts ,setPosts] = useState([])
  const [user, setUser] = useState(getUserFromToken())
   useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index()
      setPosts(postsData)
      console.log(posts,"app post");
      
    }
    if (user) fetchAllPosts()
  }, [user])
  const handleAddPost = async (formData) => {
    const newPost = await postService.create(formData)
    setPosts([...posts , newPost])
    navigate('/posts')
  }

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
  }
const deletePost=async(postId)=>{
      await postService.deletePost(postId)
      const filteredPost = posts.filter((post)=> posts._id !== postId)
      setPosts(filteredPost)
      navigate('/posts')
    }
  return (
    <div className="app-layout">
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path="/users/:userId" element={<Profile user={user}/>} />
        <Route path="/users/:userId/edit" element={<EditProfile user={user} />} />
        <Route path="/users/:userId/followers" element={<UserList type='followers' /> } />
        <Route path="/users/:userId/following" element={<UserList type='following' /> } />

        <Route path="/posts" element={<PostList posts={posts} user={user} onPostUpdated={handlePostUpdated}/>}/>
        <Route path='/posts/new' element={<PostForm handleAddPost={handleAddPost}/>}/>
        <Route path='/posts/:postId' element={<PostDetails posts={posts} deletePost={deletePost} user={user} onPostUpdated={handlePostUpdated}
         deletePost={deletePost}/>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App