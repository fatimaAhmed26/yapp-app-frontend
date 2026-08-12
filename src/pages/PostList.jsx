import { Link } from "react-router"
import { likeToggle } from "../services/post"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"

const PostList = (props) => {
    const handleLike = async (postId) => {
        const updatedPost = await likeToggle(postId)
        props.onPostUpdated(updatedPost)
    }

    return (
        <main className="feed">
            <ul className="feed-list">
            <h1>For the certified professional yappers.</h1>
                {props.posts.map((post) => {
                    const isLiked = props.user && post.likes?.some((like) => like === props.user._id || like._id === props.user._id)

                    return (
                        <li className="feed-post" key={post._id}>
                            <Link to={`/users/${post.owner?._id}`} className="feed-post-owner">
                                {post.owner?.profilePic ? (
                                    <img className="feed-avatar" src={post.owner.profilePic} alt={post.owner.username} />
                                ) : (
                                    <div className="feed-avatar-placeholder"></div>
                                )}
                                <span className="feed-username">{post.owner?.username}</span>
                            </Link>

                            <Link to={`/posts/${post._id}`} className="feed-post-link">
                                {post.text && <p className="feed-post-text">{post.text}</p>}
                                {post.media?.type === 'image' && (
                                    <div className="feed-post-media">
                                        <img src={post.media.url} alt="media" />
                                    </div>
                                )}
                                {post.media?.type === 'video' && (
                                    <div className="feed-post-media">
                                        <video src={post.media.url} controls />
                                    </div>
                                )}
                            </Link>

                            <button className="feed-like-btn" onClick={() => handleLike(post._id)}>
                                {isLiked ? (
                                    <HeartIconSolid className="like-icon like-icon-active" />
                                ) : (
                                    <HeartIcon className="like-icon" />
                                )}
                                {post.likes?.length || 0}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

export default PostList