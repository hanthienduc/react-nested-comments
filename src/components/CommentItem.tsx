import { useState } from "react";
import { usePost } from "../context/PostContext";
import { Comment } from "../types/PostContextType";
import { CommentList } from "./CommentList";
import { IconBtn } from "./IconBtn";


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
})

export function CommentItem({ id, message, user, createdAt, likeCount, likedByMe }: Comment) {

  const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(false)

  const { getReplies } = usePost()

  const childComments = getReplies !== undefined && getReplies(id)

  return (
    <div className="comment">
      <div className="header">
        <span className="name">{user.name}</span>
        <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
      </div>
      <div className="message">{message}</div>

      <div className="footer">

      </div>
      {childComments?.length > 0 && (
        <>
          <div className={`nested-comments-stack ${areChildrenHidden ? 'hide' : ''}`}>
            <button className="collapse-line" aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>

          </div>
          <button className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </div>
  )
}