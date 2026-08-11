import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { show } from "../services/user";
import { followToggle } from "../services/user";
import { Link } from "react-router";
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { likeToggle } from "../services/post";

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
    const handleLike = async (postId) => {
    const updatedPost = await likeToggle(postId)
    props.onPostUpdated(updatedPost)
}

    const isFollowing = props.user && profileUser.followers?.some((follower) => follower._id=== props.user._id)
    const isOwnProfile = props.user && props.user._id === profileUser._id
    const userPosts = props.posts?.filter((post) => post.owner?._id === userId) || []
return (
    <section className="profile-page">
        <div className="profile-banner"></div>

        <div className="profile-header">
            {profileUser.profilePic ? (
                <img className="profile-avatar" src={profileUser.profilePic} alt={profileUser.username} />
            ) : (
                <div className="profile-avatar-placeholder"></div>
            )}

            <div className="profile-action-row">
                {isOwnProfile ? (
                    <Link to={`/users/${userId}/edit`}>
                        <button className="profile-btn">Edit profile</button>
                    </Link>
                ) : (
                    <button
                        className={`profile-btn ${isFollowing ? 'profile-btn-following' : 'profile-btn-follow'}`}
                        onClick={handleFollow}>
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                )}
            </div>

            <div className="profile-names">
                <h1 className="profile-display-name">{profileUser.username}</h1>
                <p className="profile-handle">@{profileUser.username}</p>
            </div>

            {profileUser.bio && <p className="profile-bio">{profileUser.bio}</p>}

            <div className="profile-stats">
                <Link className="profile-stat-link" to={`/users/${userId}/following`}>
                    <span className="profile-stat-count">{profileUser.following?.length || 0}</span> Following
                </Link>
                <Link className="profile-stat-link" to={`/users/${userId}/followers`}>
                    <span className="profile-stat-count">{profileUser.followers?.length || 0}</span> Followers
                </Link>
            </div>
        </div>

        <div className="profile-tabs">
            <div className="profile-tab profile-tab-active">Posts</div>
        </div>

        {userPosts.length === 0 ? (
            <p className="profile-empty">No posts yet.</p>
        ) : (
            <ul className="profile-posts-list">
                {userPosts.map((post) => {
                    const isLiked = props.user && post.likes?.some((like) => like === props.user._id || like._id === props.user._id)
                    return (
                    <li className="profile-post-item" key={post._id}>
                   <Link className="profile-post-link" to={`/posts/${post._id}`}>
                   <p className="profile-post-author">@{profileUser.username}</p>
                   {post.text && <p className="profile-post-text">{post.text}</p>}
                   {post.media?.type === 'image' && (
                    <div className="profile-post-media">
                <img src={post.media.url} alt="media" />
            </div>
        )}
        {post.media?.type === 'video' && (
            <div className="profile-post-media">
                <video src={post.media.url} />
            </div>
        )}
    </Link>
    <button className="profile-post-like-btn" onClick={() => handleLike(post._id)}>
    {isLiked ? (  <HeartIconSolid className="like-icon like-icon-active" /> 
    ): ( <HeartIcon className="like-icon" /> )} {post.likes?.length || 0} </button>
    </li>
                    )
})}
            </ul>
        )}
    </section>
)

}

export default Profile