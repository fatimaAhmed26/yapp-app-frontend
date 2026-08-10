const CommentList = (props) => {

  if (!props.comments || props.comments.length === 0) {
    return <p>No comments yet.</p>
  }

  return (
    <ul>
      {props.comments.map((comment) => (
        <li key={comment._id}>
          <strong>{comment.author?.username}</strong>: {comment.comment}
          {props.user && comment.author?._id === props.user._id && (
            <button onClick={() => props.handleDeleteComment(comment._id)}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default CommentList