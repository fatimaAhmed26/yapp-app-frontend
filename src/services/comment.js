const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comments`

const create = async (postId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteComment = async (postId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}