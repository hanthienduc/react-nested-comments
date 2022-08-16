import { Comment } from "../types/PostContextType";
import { IconBtn } from "./IconBtn";

interface CommentProps {
  comment: Comment
}
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
})

export function CommentItem({ comment }: CommentProps) {
  const { id, message, user, createdAt, likeCount, likedByMe } = comment
  return (
    <div className="comment">
      <div className="header">
        <span className="name">{user.name}</span>
        <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
      </div>
      <div className="message">{message}</div>

      <div className="footer">
          
      </div>
    </div>
  )
}