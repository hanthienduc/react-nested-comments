import { createContext, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../service/post";
import { Post, PostContextType, Comment } from "../types/PostContextType";


const iPostContextState = {
  post: null,
  children: null,
  rootComments: null,
  comments: null,
  setComments: () => { },
  getReplies: (id: string) => { }
}


const PostContext = createContext<PostContextType>(iPostContextState)

export function usePost() {
  return useContext(PostContext)
}


export function PostProvider(props: PostContextType) {
  const { id } = useParams()
  const { loading, error, value: post } = useAsync<Post>(() => getPost(id || ''))
  const [comments, setComments] = useState<Comment[] | undefined>([] as Comment[])


  useEffect(() => {
    if (post?.comments !== null) {
      setComments(post?.comments as SetStateAction<Comment[] | undefined>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.comments])


  const commentsByParentId = useMemo(() => {
    let group: any = {}
    if (comments !== undefined) {
      comments.forEach((comment) => {
        if (comment.parentId !== undefined || comment.parentId != null) {
          group[comment.parentId] ||= []
          group[comment.parentId].push(comment)
        }
      })
    }
    return group
  }, [comments])

  function getReplies(id: string) {
    return commentsByParentId[id]
  }


  return (
    <PostContext.Provider value={{
      post: post,
      rootComments: commentsByParentId['null'],
      getReplies
    }}>
      {loading ? <h1>Loading...</h1> :
        error ?
          <h1 className="error-msg">{error}</h1> :
          props.children
      }
    </PostContext.Provider>)
}