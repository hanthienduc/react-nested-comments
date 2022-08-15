import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../interfaces/Post";
import { getPosts } from "../service/post";

export function PostList() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function getAllPosts() {
      const posts = await getPosts()
      setPosts(posts)
    }
    getAllPosts()
  }, [])

  return (
    <>
      <h1>Post List</h1>
      <ul>
        {posts?.map(post => (<li key={post.id}><Link to={post.id}>{post.title}</Link></li>))}
      </ul>
    </>
  )
}