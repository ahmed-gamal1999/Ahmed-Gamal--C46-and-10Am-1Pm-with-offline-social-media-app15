// EditComment.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

export default function EditComment({ commentId, postId, token, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const handleEdit = async () => {
    if (!text.trim()) return toast.error("Comment cannot be empty");
    try {
      const formData = new FormData();
      formData.append("content", text);

      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Comment updated");
      setIsEditing(false);

      // Call callback to update the comment in parent state
      if (onUpdated) onUpdated(data.data.comment);
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Edit your comment..."
            className="border px-2 py-1 rounded w-64"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <FaRegEdit
          className="cursor-pointer text-gray-500 hover:text-green-700"
          onClick={() => setIsEditing(true)}
        />
      )}
    </>
  );
}
