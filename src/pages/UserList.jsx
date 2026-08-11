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
       <section className="user-list-page">
            <header className="user-list-header">
                <h1 className="user-list-title">{title}</h1>
            </header>

            {list.length === 0 ? (
                <p className="user-list-empty">
                    {type == 'followers' ? 'No followers yet.' : 'Not following anyone yet.'}
                </p>
            ) : (
                <ul className="user-list-items">
                    {list.map((user) => (
                        <li key={user._id}>
                            <Link to={`/users/${user._id}`} className="user-list-row">
                                {user.profilePic ? (
                                    <img className="user-list-avatar" src={user.profilePic} alt={user.username} />
                                ) : (
                                    <div className="user-list-avatar-placeholder"></div>
                                )}
                                <span className="user-list-username">@{user.username}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    
    )
}

export default UserList