import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faComment as regularComment,
  faThumbsUp as regularThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { CommentsType } from "@/utils/helpers/constants/interfaces";
import { COMMENT_LIST_HOOK_HELPERS } from "./Helper";
import { BLOG_SERVICES } from "@/utils/services/api/blogServices";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";

interface CommentsListProps {
  comments: CommentsType;
  handleClickCommentLike: (commentId: string) => Promise<void>;
  handleClickReply: (username: string, commentId: string) => Promise<void>;
  isCommentIdFromSubmit: string | null;
  setIsCommentIdFromSubmit: Dispatch<SetStateAction<string | null>>;
  openReplyBox: boolean;
  setOpenReplyBox: Dispatch<SetStateAction<boolean>>;
}

const CommentsListComponent: React.FC<CommentsListProps> = ({
  comments,
  handleClickCommentLike,
  handleClickReply,
  isCommentIdFromSubmit,
  setIsCommentIdFromSubmit,
  openReplyBox,
  setOpenReplyBox,
}) => {
  const {
    user,
    replyComments,
    openReplyBoxId,
    setOpenReplyBoxId,
    handleClickReplyLike,
    handleClickCommentReply,
    setReplyComments,
  } = COMMENT_LIST_HOOK_HELPERS.useManageCommentList();

  const firstReplyRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isCommentIdFromSubmit) {
      BLOG_SERVICES.getReplyComments(isCommentIdFromSubmit)
        .then((res: AxiosResponse) => {
          setReplyComments(res.data.data);
          setOpenReplyBoxId(isCommentIdFromSubmit);
          setOpenReplyBox(true);
          setIsCommentIdFromSubmit(null);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          enqueueSnackbar({
            message: err.response.data.message,
            variant: "error",
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommentIdFromSubmit]);

  useEffect(() => {
    if (openReplyBox && firstReplyRef.current) {
      firstReplyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [openReplyBox, openReplyBoxId, replyComments]);

  return (
    <>
      {comments?.results?.map((comment) => (
        <div key={comment.id}>
          <div className="flex items-start gap-2.5 space-y-5">
            <img
              className="w-8 h-8 rounded-full"
              src={`${import.meta.env.VITE_BASE_URL}${
                comment.author.profile.image
              }`}
              alt="user photo"
            />
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {user?.userId.toString() === comment.author.id.toString()
                    ? "You"
                    : comment.author.username}
                </span>
                <span className="text-xs font-normal text-gray-500">
                  {comment.created_at}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900">
                {comment.message}
              </p>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="cursor-pointer">
                    <div
                      onClick={() =>
                        handleClickCommentLike(comment.id.toString())
                      }
                    >
                      {comment.liked ? (
                        <FontAwesomeIcon
                          icon={solidThumbsUp}
                          className="mr-1"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={regularThumbsUp}
                          className="mr-1"
                        />
                      )}
                      {comment.likesCount}
                    </div>
                  </div>
                  <div>•</div>
                  <div
                    onClick={async () => {
                      if (comment.commentCount > 0) {
                        await handleClickCommentReply(
                          comment.id.toString(),
                          setOpenReplyBox,
                          openReplyBox
                        );
                      } else {
                        setOpenReplyBoxId(null);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon icon={regularComment} className="mr-1" />
                    {comment.commentCount}
                  </div>
                </div>
                <span
                  className="text-sm font-normal text-gray-500 cursor-pointer"
                  onClick={async () => {
                    setOpenReplyBoxId(comment.id.toString());
                    await handleClickReply(
                      comment.author.username,
                      comment.id.toString()
                    );
                  }}
                >
                  reply
                </span>
              </div>
            </div>
          </div>
          {openReplyBox &&
            openReplyBoxId === comment.id.toString() &&
            replyComments && (
              <div className="mb-10 mt-10 space-y-5 ml-10 w-9/12">
                {replyComments?.results?.map((reply, index) => (
                  <div
                    className="flex items-start gap-2.5"
                    key={reply.id}
                    ref={index === 0 ? firstReplyRef : null} // Assign ref to the first reply only
                  >
                    <img
                      className="w-7 h-7 rounded-full"
                      src={`${import.meta.env.VITE_BASE_URL}${
                        reply.author.profile.image
                      }`}
                      alt="user photo"
                    />
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-900">
                          {user?.userId.toString() ===
                          reply.author.id.toString()
                            ? "You"
                            : reply.author.username}
                        </span>
                        <span className="text-xs font-normal text-gray-500">
                          {reply.created_at}
                        </span>
                      </div>
                      <p className="text-sm font-normal py-2.5 text-gray-900">
                        {reply.message}
                      </p>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div>
                            {reply.liked ? (
                              <FontAwesomeIcon
                                icon={solidThumbsUp}
                                className="mr-1 cursor-pointer"
                                onClick={() =>
                                  handleClickReplyLike(
                                    comment.id.toString(),
                                    reply.id.toString()
                                  )
                                }
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={regularThumbsUp}
                                className="mr-1 cursor-pointer"
                                onClick={() =>
                                  handleClickReplyLike(
                                    comment.id.toString(),
                                    reply.id.toString()
                                  )
                                }
                              />
                            )}
                            {reply.likesCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </>
  );
};

export default CommentsListComponent;
