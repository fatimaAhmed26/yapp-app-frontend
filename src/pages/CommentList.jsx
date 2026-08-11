const CommentList = ({ comments, currentUser, handleDeleteComment }) => {
  return (
    <main className="comment-list">
      {comments?.map((comment) => (
        <article key={comment._id} className="card">
          <header>
            <p className="comment-author">{comment.author?.username || 'Unknown user'}</p>
          </header>
          <p className="comment-text">{comment.comment}</p>
          <footer className="comment-footer">
            <span>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
            {currentUser && comment.author && currentUser._id === comment.author._id && (
              <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            )}
          </footer>
        </article>
      ))}
    </main>
  )
}

export default CommentList