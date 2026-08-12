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
const PostOwner = post.owner._id === props.user._id

return(
        <main className="post-details">
            <div className="post-details-card">
                <Link to={`/users/${post.owner?._id}`} className="feed-post-owner">
                    {post.owner?.profilePic ? (
                        <img className="feed-avatar" src={post.owner.profilePic} alt={post.owner.username} />
                    ) : (
                        <div className="feed-avatar-placeholder"></div>
                    )}
                    <span className="feed-username">{post.owner?.username}</span>
                </Link>

                {post.text && <h2 className="post-details-text">{post.text}</h2>}

                {post.media?.type === 'image' && (
                    <div className="post-details-media">
                        <img src={post.media.url} alt="media" />
                    </div>
                )}
                {post.media?.type === 'video' && (
                    <div className="post-details-media">
                        <video src={post.media.url} controls />
                    </div>
                )}

                <p className="post-details-date">
                    Created at: {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {PostOwner && (
                    <div className="actions">
                        <button onClick={() => navigate(`/posts/${postId}/edit`)}>Edit</button>
                        <button className="btn-danger" onClick={openModal}>Delete</button>
                    </div>
                )}

                <dialog ref={dialogRef} className="confirm-dialog">
                    <h2>Are you sure?</h2>
                    <p>when you click delete this post will be deleted</p>
                    <div className="actions">
                        <button className="btn-danger" onClick={() => props.deletePost(postId)}>Delete</button>
                        <button type="button" className="btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </dialog>
            </div>

            <div className="post-details-comments">
                <h3>Comments</h3>
                <CommentList
                    comments={post.comment}
                    currentUser={props.user}
                    handleDeleteComment={handleDeleteComment}
                />
                <CommentForm handleAddComment={handleAddComment} />
            </div>
        </main>
    )
}
export default PostDetails