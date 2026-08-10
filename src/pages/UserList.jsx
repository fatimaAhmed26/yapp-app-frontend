import { useEffect } from "react";
import { useState } from "react";
import { show } from "../services/user";
import { Link, useParams } from "react-router";

const UserList = ({ type}) => {
    const {userId} = useParams()
    const [profileUser, setProfileUser]= useState(null)

     useEffect(() => {
             const fetchUser = async () => {
                 const userData = await show(userId)
                 setProfileUser(userData)
             }
             fetchUser()
         }, [userId])

    if (!profileUser) return <p>Loading...</p>

    const list = type == 'followers' ? profileUser.followers : profileUser.following
    const title = type == 'followers' ? 'Followers' : 'Following'

    return (
      <section>
        {list.map((user) => (
            <Link to={`/users/${user._id}`} key={user._id}>
                <div className="card">
                    <header>
                        {user.profilePic && <img src={user.profilePic} width="50px" />}
                        <h1>@{user.username}</h1>
                    </header>
                </div>
            </Link>
        ))}
      </section>
    
    )
}

export default UserList