import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BLOG_PAGE_HOOK_HELPERS } from "./Helper";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons"; // Solid version
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons"; // Regular version
import { faComment as regularComment } from "@fortawesome/free-regular-svg-icons"; // Regular version
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons"; // Regular version
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons"; // Regular version
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Regular version
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; // Regular version
import CommentsListComponent from "../commentsList/CommentsList";

const BlogComponent = () => {
  const {
    blog,
    comments,
    handleClickLike,
    handleClickCommentLike,
    handleClickSave,
    contentBlocks,
    openCommentBox,
    renderContentBlock,
    handleClickComment,
    setOpenCommentBox,
    handleClickReply,
    setUserCommentData,
    userCommentData,
    handleCommentSubmit,
    handleKeyDown,
    isCommentIdFromSubmit,
    setIsCommentIdFromSubmit,
    openReplyBox,
    setOpenReplyBox,
  } = BLOG_PAGE_HOOK_HELPERS.useManageBlogPage();

  // Return early if the blog is undefined
  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <main className="container mx-auto px-6 py-8 w-full ">
      {blog && (
        <div className="grid gap-4 mx-auto lg:w-[80%]">
        <h1 className="md:text-3xl text-xl font-bold flex justify-center items-center">{blog.title}</h1>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${blog.thumbnail}`}
            alt="Blog Post"
            className="w-full  h-auto aspect-video object-cover rounded-lg border border-gray-300"
          />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div>{blog.author.username}</div>
            <div>•</div>
            <div>{blog.created_at}</div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="cursor-pointer" onClick={handleClickLike}>
                {blog.liked ? (
                  <FontAwesomeIcon icon={solidThumbsUp} className="mr-1" />
                ) : (
                  <FontAwesomeIcon icon={regularThumbsUp} className="mr-1" />
                )}
                {blog.likesCount}
              </div>
              <div>•</div>
              <div onClick={handleClickComment} className=" cursor-pointer">
                <FontAwesomeIcon icon={regularComment} className="mr-1" />
                {blog.commentCount}
              </div>
              <div>•</div>
              {/* save button svg */}
              {blog.saved ? (
                <FontAwesomeIcon
                  icon={solidBookmark}
                  onClick={handleClickSave}
                  className=" cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  icon={regularBookmark}
                  onClick={handleClickSave}
                  className=" cursor-pointer"
                />
              )}
            </div>
          </div>
          {openCommentBox && (
            <div
              id="comment-box"
              className="fixed w-full md:w-2/6 h-full md:h-4/5 bottom-0 md:right-3 right-0 z-40 p-4 transition-transform bg-white transform-none rounded-t-lg shadow-xl flex flex-col border"
              aria-labelledby="comment-box-label"
            >
              <div className=" bg-white z-50  border-b mb-1">
                <h5
                  id="comment-box-label"
                  className="inline-flex items-center mb-4 text-base font-semibold text-gray-500"
                >
                  Responses({blog.commentCount})
                </h5>
                <button
                  type="button"
                  data-drawer-hide="comment-box"
                  aria-controls="comment-box"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center border"
                  onClick={() => {
                    setOpenCommentBox(false);
                    setOpenReplyBox(false);
                    setUserCommentData({ message: "", parent: null });
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              {/* Comment List with Scroll */}
              <div className="flex-grow overflow-y-auto mb-3">
                {comments && (
                  <CommentsListComponent
                    comments={comments}
                    handleClickCommentLike={handleClickCommentLike}
                    handleClickReply={handleClickReply}
                    isCommentIdFromSubmit={isCommentIdFromSubmit}
                    setIsCommentIdFromSubmit={setIsCommentIdFromSubmit}
                    openReplyBox={openReplyBox}
                    setOpenReplyBox={setOpenReplyBox}
                  />
                )}
              </div>

              {/* Fixed Form at the Bottom */}
              <div className="flex flex-row gap-2 w-full p-3 bg-white border-t">
                <input
                  type="text"
                  id="comment-text"
                  className="flex-grow border rounded-lg p-2 focus:outline-none"
                  placeholder="Write your comment here..."
                  name="comment"
                  value={userCommentData.message}
                  onChange={(e) =>
                    setUserCommentData((prevData) => ({
                      ...prevData, // Retain all existing fields in the state
                      message: e.target.value, // Update the message field only
                    }))
                  }
                  onKeyDown={(e) => handleKeyDown(e, blog.id)}
                />
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleCommentSubmit(blog.id)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
          <div className="overflow-hidden">
            <div className="prose text-gray-700">
              {contentBlocks.map(renderContentBlock)}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogComponent;
