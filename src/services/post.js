const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`


const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

const create = async (postFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body:postFormData,
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
    
  }
}

const deletePost = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

async function update(postId, postFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body:postFormData,
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

const show = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}
const likeToggle = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/liked`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export{
    index,
    create,
    deletePost,
    update,
    show,
    likeToggle,


}