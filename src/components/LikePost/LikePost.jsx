import axios from "axios";
import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import toast from "react-hot-toast";

export default function LikeButton({
  postId,
  token,
  initialLikes = 0,
  userLiked = false,
  onLikeChange,
}) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [liked, setLiked] = useState(userLiked);

  const handleLike = async () => {
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        const newCount = liked ? likesCount - 1 : likesCount + 1;
        setLikesCount(newCount);
        setLiked(!liked);
        if (onLikeChange) onLikeChange(newCount, !liked);
      }
    } catch (error) {
      toast.error("Error updating like");
    }
  };

  return (
    <div
      onClick={handleLike}
      className="flex-1 hover:bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer transition py-2"
    >
      {liked ? (
        <>
          <AiFillLike className="text-lg text-blue-600" />
          <span className="font-semibold text-sm text-blue-600 ">Like</span>
        </>
      ) : (
        <>
          <AiOutlineLike className="text-lg" />
          <span className="font-semibold text-sm">Like</span>
        </>
      )}
      <span className="font-semibold text-sm">{likesCount}</span>
    </div>
  );
}
