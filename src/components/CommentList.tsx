import { Comment } from "../types/PostContextType"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <>
      {comments.map(comment => (
        <div key={comment.id}>
          <CommentItem comment={comment} />
        </div>
      ))}
    </>
  )
}