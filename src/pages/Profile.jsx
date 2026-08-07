import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { show } from "../services/user";

const Profile = () => {
    const { userId } = useParams()
    const [profileUser, setProfileUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await show(userId)
            setProfileUser(userData)
        }
        fetchUser()
    }, [userId])

    if (!profileUser) return <p>Loading..</p>

return (
    <section>
        {profileUser.profilePic && <img src={profileUser.profilePic} width="100px" alt={profileUser.username} />}
        <h1>Username: {profileUser.username}</h1>
        <p>Bio:{profileUser.bio}</p>
        <p>followers: {profileUser.followers?.length || 0} Followers . {profileUser.following?.length || 0}</p>
    </section>
)
}

export default Profile