import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { FaRegComment } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { UserData } from "../Context/userData";
import CreatePost from "../CreatePost/CreatePost";
import DeleteButton from "../DeletePost/DeletePost";
import PostSkeleton from "../Skelaton/Skelaton";
import EditButton from "./../EditPost/EditButton";
import LikeButton from "./../LikePost/LikePost";
import GetFollowSuggestionsPage from "./../getFollowSuggestionsPage/GetFollowSuggestionsPage";

export default function Home() {
  const { Token, ID } = useContext(UserData);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function getAllPosts() {
    return await axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
  }

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    enabled: !!Token,
    select: (response) =>
      (response.data.data.posts || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      ),
  });
  // console.log(posts);

  const deleteMutation = useMutation({
    mutationFn: (postId) =>
      axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // =========================
  // Loading
  // =========================
  if (isLoading) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      <CreatePost />{" "}
      <div className="absolute top-25 left-5 z-50">
        <GetFollowSuggestionsPage />
      </div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md mb-5 rounded-lg w-[50%] mx-auto  text-black"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-3 items-center">
              <img
                src={post.user.photo}
                className="rounded-full cursor-pointer w-12 h-12 object-cover"
                alt={post.user.name}
                onClick={() => navigate(`userprofile/${post.user._id}`)}
              />
              <div>
                <h2
                  onClick={() => navigate(`userprofile/${post.user._id}`)}
                  className="font-semibold cursor-pointer"
                >
                  {post.user.name}
                </h2>
                <span className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <IoInformationCircleSharp
                className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500 transition"
                onClick={() => {
                  navigate(`/postdetails/${post._id}`);
                }}
              />
              {post.user._id === ID && <EditButton postId={post._id} />}
              {post.user._id === ID && (
                <DeleteButton postId={post._id} token={Token} />
              )}
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

          {/* Actions (Like / Comment placeholder) */}
          <div className="flex justify-between border-t border-gray-200 p-2 text-gray-600">
            <LikeButton
              postId={post._id}
              token={Token}
              initialLikes={post.likesCount}
              userLiked={post.likes.includes(ID)}
            />
            <div
              onClick={() => {
                navigate(`/postdetails/${post._id}`);
              }}
              className="flex-1 hover:bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer transition py-2"
            >
              <FaRegComment className="text-lg" />
              <span className="font-semibold text-sm">Comment</span>
              <span className="font-semibold text-sm">
                {post.commentsCount}
              </span>
            </div>
            <div className="flex-1 hover:bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer transition py-2">
              <PiShareFat className="text-lg" />
              <span className="font-semibold text-sm">Share</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
