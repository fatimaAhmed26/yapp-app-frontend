import { Link } from "react-router"
import { likeToggle } from "../services/post"

const PostList = (props) => {
    const handleLike = async (postId) => {
        const updatedPost = await likeToggle(postId)
        props.onPostUpdated(updatedPost)
    }

    return (
        <main>
            {props.posts.map((post) => {
                const isLiked = props.user && post.likes?.some((like) => like === props.user._id || like._id === props.user._id)
                const isOwnPost = props.user && props.user._id === post.owner

                return (
                    <div key={post._id}>
                        <Link to={`/posts/${post._id}`}>
                            {post.text && <p>{post.text}</p>}
                            {post.media?.type === 'image' && (
                                <img src={post.media.url} alt="media" width="300" />
                            )}
                            {post.media?.type === 'video' && (
                                <video src={post.media.url} controls width="300" />
                            )}
                        </Link>

                        <button onClick={() => handleLike(post._id)}>
                            {isLiked ? 'Unlike' : 'Like'} ({post.likes?.length || 0})
                        </button>
                    </div>
                )
            })}
        </main>
    )
}

export default PostList