import { useState } from "react"

const CommentForm = (props) => {

    const initialState = {
        comment: ''
    }

    const [formData, setFormData] = useState(initialState)

    

    const handleChange = (event) => {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value,
        })
    }

   const handleSubmit = (event) => {
    event.preventDefault()
    const payload = { ...formData }
    if (props.replyingTo) {
        payload.parentComment = props.replyingTo._id
    }
    props.handleAddComment(payload)
    setFormData(initialState)
    if (props.onCancelReply) props.onCancelReply()
}

   

    return (
       <form className="comment-form" onSubmit={handleSubmit}>
            {props.replyingTo && (
                <div className="comment-replying-to">
                    Replying to @{props.replyingTo.author?.username}
                    <button type="button" onClick={props.onCancelReply}>✕</button>
                </div>
            )}
            <label htmlFor='text-input'>Your comment:</label>
            <textarea required name='comment' id='text-input' value={formData.comment} onChange={handleChange}/>
            <button type='submit'>SUBMIT COMMENT</button>
        </form>
    )
}

export default CommentForm