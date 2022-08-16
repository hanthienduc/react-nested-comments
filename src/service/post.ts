import { CommentServiceType } from '../types/PostContextType'
import { makeRequest } from './makeRequest'

export function getPosts() {
  return makeRequest('/posts')
}

export function getPost({ id }: CommentServiceType) {
  return makeRequest(`/posts/${id}`)
}
