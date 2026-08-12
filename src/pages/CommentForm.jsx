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
        props.handleAddComment(formData)
        setFormData(initialState)
    }

   

    return (
       <form className="comment-form" onSubmit={handleSubmit}>
    <label htmlFor='text-input'>Your comment:</label>
    <textarea required name='comment' id='text-input' value={formData.comment} onChange={handleChange}/>
    <button type='submit'>SUBMIT COMMENT</button>
</form>
    )
}

export default CommentForm