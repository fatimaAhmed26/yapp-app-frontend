import { Link } from "react-router"

const PostList = (props) => {
  console.log(props.posts)
  return (
    <main>
      <h1>post list</h1>
      {props.posts.map((post) => (
      <Link to={`/posts/${post._id}`}>

        <div key={post._id}>
    {post.text && <p>{post.text}</p>}
    {post.media?.type === 'image' && (
      <img src={post.media.url} alt="media" width="300" />
    )}
    {post.media?.type === 'video' && (
      <video src={post.media.url} controls width="300" />
    )}
  </div>
  </Link>
))}
    </main>
  )
}
export default PostList