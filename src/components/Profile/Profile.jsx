import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { UserData } from "../Context/userData";
import CreatePost from "../CreatePost/CreatePost";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteButton from "./../DeletePost/DeletePost";
import LikeButton from "./../LikePost/LikePost";

export default function Profile() {
  const [posts, setposts] = useState([]);
  const { Token, ID } = useContext(UserData);
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserPosts() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/users/${ID}/posts`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        if (data.success == true) {
          setposts(data.data.posts);
          console.log(data.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function profileData() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/users/profile-data`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    profileData();
    getUserPosts();
  }, []);

  return (
    <>
      <CreatePost />

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md mb-5 rounded-lg w-[50%] mx-auto text-black"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-3 items-center">
              <img
                src={post.user.photo}
                className="rounded-full w-12 h-12 object-cover"
                alt={post.user.name}
              />
              <div>
                <h2 className="font-semibold">{post.user.name}</h2>
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
              />{" "}
              <FaRegEdit
                className="text-gray-600 text-2xl cursor-pointer  hover:text-amber-500 transition"
                onClick={() => {
                  navigate(`/updatepost/${post._id}`);
                }}
              />
              <DeleteButton postId={post._id} token={Token} />
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
          {post.comments?.length > 0 && (
            <div className="px-3 pb-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <h5 className="font-semibold text-sm">
                  {post.comments[0].commentCreator.name}
                </h5>
                <p className="text-sm">{post.comments[0].content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(post.comments[0].createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

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
