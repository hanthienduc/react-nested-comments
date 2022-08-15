import { makeRequest } from './makeRequest'

export function createComment(
  postId: string,
  message: string,
  parentId?: string
) {
  return makeRequest(`posts/${postId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  })
}

export function updateComment(postId: string, message: string, id: string) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'PUT',
    data: { message },
  })
}

export function deleteComment(postId: string, message: string, id: string) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'DELETE',
  })
}

export function toggleLikeComment(postId: string, id: string) {
  return makeRequest(`posts/${postId}/comments/${id}/toggleLike`, {
    method: 'POST',
  })
}
