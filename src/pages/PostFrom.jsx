import { useState, useEffect } from 'react'
import { useActionData, useParams } from 'react-router'
import * as postServices from '../services/post'
import { PhotoIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const PostForm = (props) => {

    const { postId } = useParams()
    const initialState = {
        media: '',
        text: ''
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }
    const handleFileChange = (event) => {
        setFormData(prev => ({ ...prev, media: event.target.files[0] }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (postId) {
            const submitData = new FormData()
            submitData.append('media', formData.media)
            submitData.append('text', formData.text)
            props.handleUpdatePost(postId, submitData)
        }
        else {
            const submitData = new FormData()
            submitData.append('media', formData.media)
            submitData.append('text', formData.text)
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
const post = props.posts?.find((p) => p._id === postId)

if (postId && post && props.user._id !== post.owner._id) {
    return <h1>You are not allowed to do this!!!</h1>
}
    return (
        <section className="card">
            <header>
                <h1>{postId ? 'Edit post' : 'New post'}</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Share your thoughts by adding a text, image or video</label>
                <textarea id="text" name="text" onChange={handleChange} value={formData.text} rows={4} />

                <label htmlFor="media" className="file-label">
                    {formData.media?.name || 'Add photo or video'}
                    <input type="file" id="media" name="media" onChange={handleFileChange} />
                </label>

                <button type="submit">{postId ? 'Save' : 'Post'}</button>
            </form>
        </section>
    )
}
export default PostForm