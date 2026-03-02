import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegComment } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { UserData } from "../Context/userData";
import DeleteButton from "../DeletePost/DeletePost";
import DeleteComment from "./../DeleteComment/DeleteComment";
import EditComment from "./../EditComment/EditComment";
import EditButton from "./../EditPost/EditButton";
import LikeButton from "./../LikePost/LikePost";

export default function Postdetails() {
  const { postId } = useParams();
  let { Token, ID } = useContext(UserData);
  const [post, setpost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setlikeCount] = useState();

  async function addComment() {
    if (!commentText.trim()) return;

    try {
      const formData = new FormData();
      formData.append("content", commentText);

      const { data } = await axios.post(
        `https://route-posts.routemisr.com/posts/${postId}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
        toast.success("Comment added"),
      );

      setCommentText("");

      setComments((prev) => [data.data.comment, ...prev]);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error adding comment");
    }
  }

  useEffect(() => {
    async function getSinglePost() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );

        if (data.success == true) {
          setpost(data.data.post);
          setlikeCount(data.data.post.likesCount);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function getPostComments() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );

        if (data.success == true) {
          setComments(data.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSinglePost();
    getPostComments();
  }, []);

  return (
    <>
      <div className="pb-5 ">
        <div className="bg-white shadow-md  mb-5 rounded-lg w-[50%]  mx-auto  text-black">
          {/* Header */}
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-3 items-center">
              <img
                src={post.user?.photo}
                className="rounded-full w-12 h-12 object-cover"
                alt={post.user?.name}
              />
              <div>
                <h2 className="font-semibold">{post.user?.name}</h2>
                <span className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                {post?.user?._id === ID && <EditButton postId={post?._id} />}
              </div>
              <div>
                {post.user?._id === ID && (
                  <DeleteButton postId={post._id} token={Token} />
                )}
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="px-3 ">
            <p className="mb-3">{post.body}</p>
            {post.image && (
              <img
                src={post.image}
                className="rounded-lg w-full max-h-[500px] object-cover mb-3"
                alt=""
              />
            )}
          </div>
          {/* Comments preview */}
          {comments.length > 0 &&
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-2 px-3 py-2">
                {/* Profile Image */}
                <img
                  src={comment.commentCreator?.photo}
                  alt={comment.commentCreator?.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                {/* Comment Content */}
                <div className="flex flex-col">
                  <div className="flex gap-2.5">
                    <div className="bg-gray-100 w-36 hover:bg-gray-200 transition px-3 py-2 rounded-2xl max-w-[450px]">
                      <h5 className="font-semibold text-sm text-black">
                        {comment.commentCreator?.name}
                      </h5>
                      <p className="text-sm text-gray-800 break-words">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {comment.commentCreator?._id === ID && (
                        <DeleteComment
                          commentId={comment._id}
                          postId={post._id}
                          token={Token}
                          onDeleted={(id) =>
                            setComments((prev) =>
                              prev.filter((c) => c._id !== id),
                            )
                          }
                        />
                      )}
                      {comment.commentCreator?._id === ID && (
                        <EditComment
                          commentId={comment._id}
                          postId={post._id}
                          token={Token}
                          onUpdated={(updatedComment) => {
                            setComments((prev) =>
                              prev.map((c) =>
                                c._id === updatedComment._id
                                  ? updatedComment
                                  : c,
                              ),
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 text-xs text-gray-500 mt-1 ml-3">
                    <span className="hover:underline cursor-pointer font-semibold">
                      Like
                    </span>
                    <span className="hover:underline cursor-pointer font-semibold">
                      Reply
                    </span>
                    <span>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {/* Actions (Like / Comment placeholder) */}
          <div className="flex  justify-between border-t border-gray-200 p-2 text-gray-600">
            <LikeButton
              postId={post._id}
              token={Token}
              initialLikes={post.likesCount || 0}
              userLiked={
                Array.isArray(post.likes) ? post.likes.includes(ID) : false
              }
              onLikeChange={(newLikes, liked) => setlikeCount(newLikes)}
            />
            <div className="flex-1 hover:bg-gray-100 rounded  flex items-center justify-center gap-2 cursor-pointer transition py-2">
              <FaRegComment className="text-lg" />
              <span className="font-semibold text-sm">Comment</span>
            </div>
            <div className="flex-1 hover:bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer transition py-2">
              <PiShareFat className="text-lg" />
              <span className="font-semibold text-sm">Share</span>
            </div>
          </div>
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-start gap-3">
              {/* User Image */}
              <img
                src={post.user?.photo}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Comment arya */}
              <div className="flex-1">
                <div className="bg-gray-100 hover:bg-gray-200 transition rounded-2xl px-4 py-2 flex items-center">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    id="commentValue"
                    placeholder="Write a comment..."
                    className="bg-transparent w-full resize-none text-sm placeholder-gray-500 border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                    rows="1"
                  ></input>
                </div>

                {/* Action Row */}
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      addComment();
                    }}
                    className="cursor-pointer hover:bg-gray-300 transition text-gray-400 text-sm font-semibold p-2 rounded-full"
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
