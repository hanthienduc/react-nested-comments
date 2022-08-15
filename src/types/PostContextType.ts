import { ReactNode } from 'react'

export interface User {
  id: string
  name: string
}

export interface Comment {
  id: string
  message: string
  createdAt: string
  likeCount: number
  likedByMe?: boolean

  parentId?: string | undefined

  user: User
}

export interface Post {
  id: string
  title: string
  body: string
  comments: Comment[]
}

export type PostContextType = {
  post?: Post | null
  children?: ReactNode | null
  rootComments?: Comment[] | null
  comments?: Comment[] | null
  setComments?: React.Dispatch<React.SetStateAction<string | null>>
  getReplies?: (id: string) => any
}
