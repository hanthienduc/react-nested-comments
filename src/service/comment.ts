import { CommentServiceType } from '../types/PostContextType'
import { makeRequest } from './makeRequest'

export function createComment({
  postId,
  message,
  parentId,
}: CommentServiceType) {
  console.log(postId)
  return makeRequest(`posts/${postId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  })
}

export function updateComment({ postId, message, id }: CommentServiceType) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'PUT',
    data: { message },
  })
}

export function deleteComment({ postId, id }: CommentServiceType) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'DELETE',
  })
}

export function toggleLikeComment({ postId, id }: CommentServiceType) {
  return makeRequest(`posts/${postId}/comments/${id}/toggleLike`, {
    method: 'POST',
  })
}
