import { useState } from "react";
import { usePost } from "../context/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { useUser } from "../hooks/useUser";
import { createComment } from "../service/comment";
import { Comment } from "../types/PostContextType";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { IconBtn } from "./IconBtn";
import { FaReply } from 'react-icons/fa'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
})

export function CommentItem({ id, message, user, createdAt, likeCount, likedByMe }: Comment) {

  const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)

  const { getReplies, post, createLocalComment } = usePost()

  const childComments = getReplies !== undefined && getReplies(id)

  const currentUser = useUser()

  const createCommentFn = useAsyncFn(createComment)

  function onCommentReply(message: string) {
    return createCommentFn.execute({ postId: post?.id, message, parentId: id })
      .then((comment) => {
        setIsReplying(false)
        if (createLocalComment !== undefined) {
          createLocalComment(comment)
        }
      })
  }

  return (
    <div className="comment">
      <div className="header">
        <span className="name">{user.name}</span>
        <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
      </div>
      <div className="message">{message}</div>

      <div className="footer">
        <IconBtn Icon={FaReply}
          onClick={() => setIsReplying(prev => !prev)}
          isActive={isReplying}
          aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
        />
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}
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