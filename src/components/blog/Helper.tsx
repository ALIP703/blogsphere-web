import React from "react";
import { AxiosResponse } from "axios";
import { BLOG_SERVICES } from "@/utils/services/api/blogServices";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/utils/helpers/hook/ReduxHook";
import { RootState } from "@/utils/helpers/auth/store";
import { formatDate } from "@/utils/helpers/constants/functions";
import {
  BlogContentBlock,
  BlogType,
  CommentsType,
} from "@/utils/helpers/constants/interfaces";

export const BLOG_PAGE_HOOK_HELPERS = {
  useManageBlogPage: () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Extract the id from the URL
    const { user } = useAppSelector((state: RootState) => state.auth);
    const [blog, setBlog] = React.useState<BlogType>();
    const [comments, setComments] = React.useState<CommentsType>();
    const [openReplyBox, setOpenReplyBox] = React.useState<boolean>(false);
    const [openCommentBox, setOpenCommentBox] = React.useState<boolean>(false);
    const [userCommentData, setUserCommentData] = React.useState<{
      message: string;
      parent: string | null;
    }>({
      message: "",
      parent: null,
    });
    const [isCommentIdFromSubmit, setIsCommentIdFromSubmit] = React.useState<
      string | null
    >(null);

    const handleClickReply = (
      username: string,
      commentId: string
    ): Promise<void> => {
      return new Promise((resolve) => {
        setOpenReplyBox(true);
        setUserCommentData((prevData) => ({
          ...prevData,
          message: "@" + username + " ",
          parent: commentId,
        }));
        resolve(); // Resolve the promise immediately
      });
    };

    const handleClickLike = async () => {
      if (user && id) {
        await BLOG_SERVICES.likeABlog(id).then((res) => {
          if (res.data.status === 200) {
            void BLOG_SERVICES.getABlog(id)
              .then((res: AxiosResponse) => {
                res.data.data.created_at = formatDate(res.data.data.created_at);
                setBlog(res.data.data);
              })
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .catch((err: any) => {
                //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
                if (err?.response?.status) {
                  navigate("login");
                }
              });
          }
        });
      }
    };

    const handleClickCommentLike = async (commentId: string) => {
      if (user && commentId && id) {
        await BLOG_SERVICES.likeAComment(commentId).then(async (res) => {
          if (res.data.status === 200) {
            await BLOG_SERVICES.getBlogComments(id)
              .then((res: AxiosResponse) => {
                setComments(res.data.data);
              })
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .catch((err: any) => {
                //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
                if (err?.response?.status) {
                  navigate("login");
                }
              });
          }
        });
      } else {
        navigate("login");
      }
    };

    const handleClickSave = async () => {
      if (user && id) {
        await BLOG_SERVICES.saveABlog(id).then((res) => {
          if (res.data.status === 200) {
            void BLOG_SERVICES.getABlog(id)
              .then((res: AxiosResponse) => {
                res.data.data.created_at = formatDate(res.data.data.created_at);
                setBlog(res.data.data);
              })
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .catch((err: any) => {
                //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
                if (err?.response?.status) {
                  navigate("login");
                }
              });
          }
        });
      }
    };

    const handleClickComment = async () => {
      if (id) {
        await BLOG_SERVICES.getBlogComments(id)
          .then((res: AxiosResponse) => {
            setComments(res.data.data);
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((err: any) => {
            //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
            if (err?.response?.status === 403) {
              navigate("login");
            }
          });
      }
      setOpenCommentBox(!openCommentBox);
    };
    React.useEffect(() => {
      if (id) {
        void BLOG_SERVICES.getABlog(id)
          .then((res: AxiosResponse) => {
            res.data.data.created_at = formatDate(res.data.data.created_at);
            setBlog(res.data.data);
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((err: any) => {
            //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
            if (err?.response?.status) {
              navigate("login");
            }
          });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCommentSubmit = async (id: string) => {
      const formData = new FormData();
      let message = userCommentData.message;
      // Check if the message starts with @username and remove it
      const usernamePattern = /^@\w+\s*/;
      message = message.replace(usernamePattern, "").trim();
      formData.append("message", message);
      if (userCommentData.parent) {
        formData.append("parent", userCommentData.parent);
      }
      await BLOG_SERVICES.createComment(id, formData).then(async (res) => {
        if (res.status === 200 || res.status === 201) {
          await BLOG_SERVICES.getBlogComments(id)
            .then(async (res: AxiosResponse) => {
              setComments(res.data.data);
              if (userCommentData.parent) {
                setIsCommentIdFromSubmit(userCommentData.parent.toString());
              }
              setUserCommentData({ message: "", parent: null });
              await BLOG_SERVICES.getABlog(id)
                .then((res: AxiosResponse) => {
                  res.data.data.created_at = formatDate(
                    res.data.data.created_at
                  );
                  setBlog(res.data.data);
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((err: any) => {
                  //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
                  if (err?.response?.status === 403) {
                    navigate("login");
                  }
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err: any) => {
              //   enqueueSnackbar({ message: err.response.data.message ?? MESSAGES_HELPERS.ERROR_OCCURRED, variant: 'error' })
              if (err?.response?.status) {
                navigate("login");
              }
            });
        }
      });
    };
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      id: string
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleCommentSubmit(id);
      }
    };
    const contentBlocks: BlogContentBlock[] = blog
      ? JSON.parse(blog.content)
      : [];
    // Function to render content based on its type
    const renderContentBlock = (block: BlogContentBlock) => {
      switch (block.type) {
        case "heading":
          return React.createElement(
            `h${block.props.level || 1}`, // Default to h1 if level is not defined
            { key: block.id },
            block.content.map((item, index) => (
              <span key={index}>{item.text}</span>
            ))
          );
        case "paragraph":
          return (
            <p key={block.id}>
              {block.content.map((item, index) => (
                <span key={index}>{item.text}</span>
              ))}
            </p>
          );
        case "image":
          return (
            <div key={block.id}>
              <img
                src={block.props.url || ""}
                alt={block.props.caption || ""}
                width={block.props.previewWidth || 100} // Default width if not provided
              />
              {block.props.caption && (
                <figcaption>{block.props.caption}</figcaption>
              )}
            </div>
          );
        default:
          return null; // Return null for unsupported types
      }
    };
    return {
      blog,
      setBlog,
      comments,
      isCommentIdFromSubmit,
      setIsCommentIdFromSubmit,
      handleClickReply,
      openReplyBox,
      setOpenReplyBox,
      openCommentBox,
      handleClickCommentLike,
      handleClickComment,
      setOpenCommentBox,
      handleClickLike,
      handleClickSave,
      contentBlocks,
      setUserCommentData,
      userCommentData,
      renderContentBlock,
      handleCommentSubmit,
      handleKeyDown,
    };
  },
};
