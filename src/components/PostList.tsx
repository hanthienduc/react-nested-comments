import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../service/post";
import { Post } from "../types/PostContextType";

export function PostList() {

  const { loading, error, value: posts } = useAsync<Post[]>(getPosts)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1 className="error-msg">{error}</h1>

  return (
    <>
      <h1>Posts</h1>
      {posts?.map(post =>
        (<h1 key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></h1>)
      )}
    </>
  )
}