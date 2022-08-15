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

  parentId?: string

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
}
