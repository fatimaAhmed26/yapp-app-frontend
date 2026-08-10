import { useParams, useNavigate, Link } from "react-router"
import { useRef } from 'react';
const PostDetails = (props) =>{
      const { postId } = useParams()
  const navigate = useNavigate()
  const post = props.posts.find((post) => post._id === postId)
    

      const dialogRef = useRef(null);
    const openModal = () => dialogRef.current?.showModal();
      const closeModal = () => dialogRef.current?.close();

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
      <button onClick={openModal}>Delete</button>
      <dialog ref={dialogRef} style={{ padding: '20px', borderRadius: '8px', border: 'none' }}>
        <h2>Are you sure?</h2>
        <p>when you click delete this post will be deleted</p>
                    <button onClick={() => props.deletePost(postId)}>Delete</button>
        <button onClick={closeModal}>Close</button>
      </dialog>

    </main>
)
}
export default PostDetails