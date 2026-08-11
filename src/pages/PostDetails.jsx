import { useParams, useNavigate, Link } from "react-router"
import { useRef } from 'react';
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
const PostDetails = (props) =>{
      const { postId } = useParams()
  const navigate = useNavigate()
  const post = props.posts.find((post) => post._id === postId)

    if (!post) return <main>Loading...</main> 

    const handleAddComment = (commentFormData) => {
    props.handleAddComment(postId, commentFormData)}

    const handleDeleteComment = (commentId) => {
    props.handleDeleteComment(postId, commentId)}



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

      <h3>Comments</h3>
      <CommentList
        comments={post.comment}
        user={props.user}
        handleDeleteComment={handleDeleteComment}
      />
      <CommentForm handleAddComment={handleAddComment} />
    </main>
)
}
export default PostDetails