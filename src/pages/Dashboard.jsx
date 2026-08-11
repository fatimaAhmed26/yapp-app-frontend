import { useEffect, useState } from "react"
import * as postService from '../services/post'
import { index } from '../services/user'
import { Link } from "react-router"
import PostList from "./PostList"


const Dashboard = (props) => {
console.log(props);

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
          console.log(posts,"app post");
          
        }
        if (allUsers) fetchAllPosts()
      }, [allUsers])
    const handleLike = async (postId) => {
        const updatedPost = await likeToggle(postId)
        props.onPostUpdated(updatedPost)
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
            <PostList posts={posts} />
        </section>
    )
}

export default Dashboard