const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()
        

        if (data.err) {
            throw new Error(data.err)
        }

        return data
    } catch (err) {
        throw new Error(err)
    }
}

const show = async (userId) => {
try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
} catch (err) {
    throw new Error(err)
}
}

const followToggle = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/follow`, { 
            method: 'PUT',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data= await res.json()

         if (data.err) {
            throw new Error(data.err)
        }

        return data
    } catch (err) {
         throw new Error(err)
    }
}

const update = async (userId, userFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: userFormData,
    })
    return res.json()
    } catch (err) {
        throw new Error(err)
    }
}

const deleteUser = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()

         if (data.err) {
            throw new Error(data.err)
        }
    } catch (err) {
        throw new Error(err)
    }
}

export {
    index,
    show,
    followToggle,
    update,
    deleteUser
}