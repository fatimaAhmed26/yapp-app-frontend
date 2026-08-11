import { useParams, useNavigate, Link } from "react-router"
import { useRef } from 'react';
import { create, deleteComment } from '../services/comment'
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostDetails = (props) =>{
      const { postId } = useParams()
  const navigate = useNavigate()
  const post = props.posts.find((post) => post._id === postId)

    const handleAddComment = async (formData) => {
    const newComment = await create(postId, formData)
    const updatedPost = { ...post, comment: [...post.comment, newComment] }
    props.onPostUpdated(updatedPost)}

    const handleDeleteComment = async (commentId) => {
    await deleteComment(postId, commentId)
    const updatedPost = { ...post, comment: post.comment.filter((comment) => comment._id !== commentId) }
    props.onPostUpdated(updatedPost)
}
    if (!post) return <main>Loading...</main>

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
                currentUser={props.user}
                handleDeleteComment={handleDeleteComment}
            />
            <CommentForm handleAddComment={handleAddComment} />
    </main>
)
}
export default PostDetails