import { useState, useEffect } from "react";
import { show, update } from "../services/user";
import { useParams, useNavigate } from "react-router";


const EditProfile = (props) => {
     const { userId } = useParams()
     const navigate = useNavigate()
     const [message, setMessage] = useState('')
     const [profilePic, setProfilePic]= useState(null)
     const [formData, setFormData] = useState({ bio: ''})

    useEffect(() => {
             const fetchUser = async () => {
                 const userData = await show(userId)
                 setFormData({bio: userData.bio || ''})
             }
             fetchUser()
         }, [userId])

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
            if (profilePic) {
                submitData.append('profilePic', profilePic)
            }
            
            await update(userId, submitData)
            navigate(`/users/${userId}`)
        } catch (err) {
            setMessage(err.message)
        }
    }

   

    return (
        <section>
            <header>
                <h1>Edit profile</h1>
            </header>
            <form onSubmit={handleSubmit}>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange} />
                Profile Pic:
                <input type="file" name="profilePic" onChange={handleFileChange} />

                <button type="submit">Submit</button>
                <button type="button"onClick={() => navigate(`/users/${userId}`)} >Cancel</button>
            </form>
        </section>
    )

}

export default EditProfile