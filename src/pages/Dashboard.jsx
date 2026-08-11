import { useEffect, useState } from "react"
import * as postService from '../services/post'
import { index } from '../services/user'
import { Link } from "react-router"
import PostList from "./PostList"

const Dashboard = (props) => {

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData =  await index()
            setAllUsers(usersData)
        }
        fetchUsers()
        
    }, [])
    const [posts ,setPosts] = useState([])
       useEffect(() => {
        const fetchAllPosts = async () => {
          const postsData = await postService.index()
          setPosts(postsData)
          
        }
        if (allUsers) fetchAllPosts()
      }, [allUsers])
    const handleLike = async (postId) => {
        const updatedPost = await likeToggle(postId)
        props.onPostUpdated(updatedPost)
    }
const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
  }
    return (
        <section>
            {/* <header>
                <h1>Welcome {props.user.username}!</h1>
                <h2>View All the Users</h2>
            </header>
            {allUsers.map((user) => (
                <Link to={`/users/${user._id}`} key={user._id}>
                    
               
                <div className="card">
                    <header>
                        <h1>
                        {user.username}
                        </h1>
                    </header>
                    
                </div> 
                </Link>
            ))} */}
            <PostList posts={posts} onPostUpdated={handlePostUpdated}/>
        </section>
    )
}

export default Dashboard