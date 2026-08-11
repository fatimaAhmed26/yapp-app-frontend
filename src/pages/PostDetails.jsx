import { useParams, useNavigate, Link } from "react-router"
import { useRef } from 'react';
import { useState } from "react";
import { create, deleteComment } from '../services/comment'
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostDetails = (props) =>{
      const { postId } = useParams()
  const navigate = useNavigate()
  const post = props.posts.find((post) => post._id === postId)
 const [profileUser, setProfileUser] = useState(null)
 const dialogRef = useRef(null);
const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();
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
const PostOwner = props.posts.user === props.user._id
return(
    <main>
        post details
        <h2>{post.text}</h2>
        {props.user.username}
            {post.media?.type === 'image' && (
      <img src={post.media.url} alt="media" width="300" />
    )}
    {post.media?.type === 'video' && (
      <video src={post.media.url} controls width="300" />
    )}

   { PostOwner? (
     ("")
    ) :<>
     <button onClick={() => navigate(`/posts/${postId}/edit`)}>Edit</button> 
    <button onClick={openModal}>Delete</button> 
     </> }
      <dialog ref={dialogRef} style={{ padding: '20px', borderRadius: '8px', border: 'none' }}>
        <h2>Are you sure?</h2>
        <p>when you click delete this post will be deleted</p>
                    <button onClick={() => props.deletePost(postId)}>Delete</button>
        <button onClick={closeModal}>Close</button>
      </dialog>

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