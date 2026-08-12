import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio:'',

    }

    const [formData, setFormData] = useState(initialState)
    const [profilePic, setProfilePic] = useState(null)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

     const handleFileChange = (event) => {
        setProfilePic(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const submitData = new FormData(event.target)
            const newUser = await signUp(submitData)
            props.setUser(newUser)
            setFormData(initialState)
            setProfilePic(null)
            navigate('/posts')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        if(formData.username && formData.password && formData.password === formData.confirmPassword) {
            return true
        } else return false
    }

    return (
        <section className="card">
            <header>
                <h1>Sign Up</h1>
                <p>{message}</p>
            </header>
            <form onSubmit={handleSubmit}>
                Username:
                <input type="text" name="username" onChange={handleChange} value={formData.username} required />
                Email: 
                <input type="email" name="email" onChange={handleChange} value={formData.email} required />
                Password:
                <input type="password" name="password" onChange={handleChange} value={formData.password} required />
                Confirm Password:
                <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />
                Bio:
                <input type="text" name="bio" onChange={handleChange} value={formData.bio} />
                Profile Picture:
                <input type="file" name="profilePic" onChange={handleFileChange} />
                <div className="actions">
                    <button type="submit" disabled={!isFormValid()}>Sign Up</button>
                    <button>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default SignUpForm

