import { Link } from "react-router"

const CommentList = ({ comments, currentUser, handleDeleteComment, onReply }) => {
  const topLevel = comments?.filter((c) => !c.parentComment) || []
  const getReplies = (commentId) => comments?.filter((c) => c.parentComment === commentId) || []

  const renderComment = (comment, isReply = false) => (
    <article key={comment._id} className={`comment-item ${isReply ? 'comment-reply' : ''}`}>
      <div className="comment-avatar-col">
        {comment.author?.profilePic ? (
          <img className="comment-avatar" src={comment.author.profilePic} alt={comment.author.username} />
        ) : (
          <div className="comment-avatar-placeholder"></div>
        )}
        {getReplies(comment._id).length > 0 && <div className="comment-thread-line"></div>}
      </div>
      <div className="comment-body">
        <header className="comment-header-row">
          <p className="comment-author">
            {comment.author ? (
              <Link to={`/users/${comment.author._id}`}>
                @{comment.author.username}
              </Link> ) : ( 'Unknown user' )}
          </p>
          <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </header>
        <p className="comment-text">{comment.comment}</p>
        <div className="comment-footer">
          <button onClick={() => onReply(comment)}>Reply</button>
          {currentUser && comment.author && currentUser._id === comment.author._id && (
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          )}
        </div>
        {getReplies(comment._id).length > 0 && (
          <div className="comment-replies">
            {getReplies(comment._id).map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    </article>
  )

  return (
    <main className="comment-list">
      {topLevel.map((comment) => renderComment(comment))}
    </main>
  )
}

export default CommentList