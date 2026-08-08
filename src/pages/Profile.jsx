import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { show } from "../services/user";
import { followToggle } from "../services/user";
import { Link } from "react-router";

const Profile = (props) => {
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

    const handleFollow = async () => {
        await followToggle(userId)
        const nowUser = await show(userId)
        setProfileUser(nowUser)

    }

    const isFollowing = props.user && profileUser.followers?.some((follower) => follower._id=== props.user._id)
    const isOwnProfile = props.user && props.user._id === profileUser._id

return (
    <section>
        {profileUser.profilePic && <img src={profileUser.profilePic} width="100px" alt={profileUser.username} />}
        <h1>Username: {profileUser.username}</h1>
        <p>Bio:{profileUser.bio}</p>
        <Link to={`/users/${userId}/followers`}>Followers: {profileUser.followers?.length || 0} </Link>
        <Link to={`/users/${userId}/following`}>Following: {profileUser.following?.length || 0} </Link>

        {isOwnProfile ?(
            <Link to={`/users/${userId}/edit`}>
                <button>Edit profile</button>
            </Link>
        ): (
             <button onClick={handleFollow}>
            {isFollowing ? 'Unfollow': 'Follow'}
        </button>
        )}
    </section>
)
}

export default Profile