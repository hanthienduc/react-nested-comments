import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../service/post";
import { Post, PostContextType } from "../types/PostContextType";

const PostContext = createContext({} as PostContextType)

export function usePost() {
 return useContext(PostContext)
}

export function PostProvider(props: PostContextType) {
  const { id } = useParams()
  const { loading, error, value: post } = useAsync<Post>(() => getPost(id || ''))

  return (
    <PostContext.Provider value={{
      post: post
    }}>
      {loading ? <h1>Loading...</h1> :
        error ?
          <h1 className="error-msg">{error}</h1> :
          props.children
      }
    </PostContext.Provider>)
}