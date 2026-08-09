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
    const [appMedia ,setAppMedia] =useState('')
    const handleSubmit = (event)=>{
        evt.preventDefault()
        props.handleAddPost(formData)
    }
    const handleChange=(evt)=>{
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }
     const handleFileChange = (event) => {
        setAppMedia(event.target.files[0])
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
        <dev>
            <h1>post form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="media">Share your thoughts by adding a text, image or video </label>
                <input type="file" name='media' onChange={handleFileChange} />
                <input type="text" name='text' onChange={handleChange}/>
                <button type='submit'>Add Post</button>
            </form>
        </dev>
    )
}
export default PostForm