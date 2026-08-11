import { useState, useEffect } from 'react'
import { useActionData, useParams } from 'react-router'
import * as postServices from '../services/post'


const PostForm =(props)=>{

    const { postId } = useParams()
    const initialState ={
        media:'',
        text:''
    }
    const [formData , setFormData] = useState(initialState)

       const handleChange=(evt)=>{
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }
     const handleFileChange = (event) => {
        (event.target.files)
        setFormData(prev => ({...prev, media: event.target.files[0]}))
    }
   const handleSubmit = (event) => {
    event.preventDefault()
    if (postId) {
        const submitData = new FormData()
        submitData.append('media', formData.media)
        submitData.append('text', formData.text)
        props.handleUpdatePost(postId, submitData)
    }
    else
        {
         const submitData = new FormData()
        submitData.append('media', formData.media)
        submitData.append('text', formData.text)
        (submitData);
        ([...submitData.entries()],"submit Data");
        
         props.handleAddPost(submitData)
        }
}
 
    
  useEffect(() => {
    const fetchPost = async () => {
        const postData = await postServices.show(postId)
        setFormData(postData)
    }
    if (postId) fetchPost()
    
    return () => setFormData(initialState)
  }, [postId])
    return(
        <div>
            <h1>post form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="media">Share your thoughts by adding a text, image or video </label>
                <input type="file" name='media' onChange={handleFileChange} />
                <input type="text" name='text' onChange={handleChange} value={formData.text}/>
                <button type='submit'>Add Post</button>
            </form>
        </div>
    )
}
export default PostForm