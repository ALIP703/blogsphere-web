import { RootState } from "@/utils/helpers/auth/store";
import { CommentsType } from "@/utils/helpers/constants/interfaces";
import { useAppSelector } from "@/utils/helpers/hook/ReduxHook";
import { BLOG_SERVICES } from "@/utils/services/api/blogServices";
import { AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

export const COMMENT_LIST_HOOK_HELPERS = {
  useManageCommentList: () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state: RootState) => state.auth);

    // State to track which comment's reply box is open
    const [openReplyBoxId, setOpenReplyBoxId] = React.useState<string | null>(
      null
    );
    const [replyComments, setReplyComments] =
      React.useState<CommentsType | null>(null);

    const handleClickCommentReply = async (
      commentId: string,
      setOpenReplyBox: Dispatch<SetStateAction<boolean>>,
      openReplyBox: boolean
    ) => {
      if (openReplyBox === true) {
        setOpenReplyBox(false);
        // setOpenReplyBoxId(null);
      } else {
        await BLOG_SERVICES.getReplyComments(commentId)
          .then((res: AxiosResponse) => {
            setReplyComments(res.data.data);
            setOpenReplyBoxId(commentId);
            setOpenReplyBox(true);
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((err: any) => {
            //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
            if (err?.response?.status === 403) {
              navigate("login");
            }
          });
      }
    };

    const handleClickReplyLike = async (parent: string, commentId: string) => {
      if (user && commentId) {
        await BLOG_SERVICES.likeAComment(commentId).then(async (res) => {
          if (res.data.status === 200) {
            await BLOG_SERVICES.getReplyComments(parent)
              .then((res: AxiosResponse) => {
                setReplyComments(res.data.data);
              })
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .catch((err: any) => {
                //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
                if (err?.response?.status === 403) {
                  navigate("login");
                }
              });
          }
        });
      } else {
        navigate("login");
      }
    };
    return {
      user,
      openReplyBoxId,
      replyComments,
      setReplyComments,
      setOpenReplyBoxId,
      handleClickReplyLike,
      handleClickCommentReply,
    };
  },
};
