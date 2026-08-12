import { useState, useEffect } from "react";
import { deleteUser, show, update } from "../services/user";
import { useParams, useNavigate } from "react-router";


const EditProfile = (props) => {
     const { userId } = useParams()
     const navigate = useNavigate()
     const [message, setMessage] = useState('')
     const [profilePic, setProfilePic]= useState(null)
     const [formData, setFormData] = useState({ bio: '', username: ''})

    useEffect(() => {
             const fetchUser = async () => {
                 const userData = await show(userId)
                 setFormData({bio: userData.bio || '', username: userData.username || '' })
             }
             fetchUser()
         }, [userId])

         if (!props.user || props.user._id !== userId) {
        return <h1>You are not allowed to do this!!!</h1>
    }

    const handleFileChange = (event) => {
        setProfilePic(event.target.files[0])
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const submitData = new FormData()
            submitData.append('bio', formData.bio)
            submitData.append('username', formData.username)
            if (profilePic) {
                submitData.append('profilePic', profilePic)
            }
            
            await update(userId, submitData)
            navigate(`/users/${userId}`)
        } catch (err) {
            setMessage(err.message)
        }
    }

    const handleDelete = async (event) => {
        try {
            await deleteUser(userId)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }
   

      return (
        <section className="card">
            <header>
                <h1>Edit profile</h1>
            </header>

            {message && <p className="form-error">{message}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>

                <label>
                    Bio
                    <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                </label>

                <label>
                    Profile Picture
                    <input type="file" name="profilePic" onChange={handleFileChange} />
                </label>

                <div className="actions">
                    <button type="submit">Save</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate(`/users/${userId}`)}>Cancel</button>
                </div>

                <button type="button" className="btn-danger" onClick={handleDelete}>Delete Account</button>
            </form>
        </section>
    )

}

export default EditProfile