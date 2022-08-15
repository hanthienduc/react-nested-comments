import { Comment } from "../types/PostContextType";

interface CommentProps {
  comment: Comment
}
export function CommentItem({ comment }: CommentProps) {
  const { id, message, user, createdAt, likeCount, likedByMe } = comment
  return (
    <div className="comment">
        <span className="name">{user.name}</span>

    </div>
  )
}