import { createContext, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../service/post";
import { Post, PostContextType, Comment } from "../types/PostContextType";


const PostContext = createContext<PostContextType>({} as PostContextType)

export function usePost() {
  return useContext(PostContext)
}


export function PostProvider(props: PostContextType) {
  const { id } = useParams()
  const { loading, error, value: post } = useAsync<Post>(() => getPost({ id } || ''))
  const [comments, setComments] = useState<Comment[]>([] as Comment[])


  useEffect(() => {
    if (post?.comments !== null) {
      setComments(post?.comments as SetStateAction<Comment[]>)
    }
    console.log(post?.id)
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

  function createLocalComment(comment: Comment) {
    setComments(prevComments => ([
      comment,
      ...prevComments
    ])
    )
  }

  function updateLocalComment(id: string, message: string) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (id === comment.id) {
          return {
            ...comment,
            message: message
          }
        }
        return comment
      })
    })
  }

  function deleteLocalComment(id: string) {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id))
  }

  function toggleLocalCommentLike(id: string, addLike: boolean) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          if (addLike) {
            return {
              ...comment,
              likedByMe: addLike,
              likeCount: comment.likeCount += 1
            }
          } else {
            return {
              ...comment,
              likedByMe: addLike,
              likeCount: comment.likeCount -= 1
            }
          }
        } else {
          return comment
        }
      })
    })
  }

  return (
    <PostContext.Provider value={{
      post: {
        id: id,
        ...post
      },
      rootComments: commentsByParentId['null'],
      getReplies,
      createLocalComment,
      updateLocalComment,
      deleteLocalComment,
      toggleLocalCommentLike
    }}>
      {loading ? <h1>Loading...</h1> :
        error ?
          <h1 className="error-msg">{error}</h1> :
          props.children
      }
    </PostContext.Provider>)
}