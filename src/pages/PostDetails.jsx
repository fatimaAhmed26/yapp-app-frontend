import { useParams, useNavigate, Link } from "react-router"
const PostDetails = (props) =>{
      const { postId } = useParams()
  const navigate = useNavigate()
  const post = props.posts.find((post) => post._id === postId)

return(
    <main>
        post details
        <h2>{post.text}</h2>
            {post.media?.type === 'image' && (
      <img src={post.media.url} alt="media" width="300" />
    )}
    {post.media?.type === 'video' && (
      <video src={post.media.url} controls width="300" />
    )}

    </main>
)
}
export default PostDetails