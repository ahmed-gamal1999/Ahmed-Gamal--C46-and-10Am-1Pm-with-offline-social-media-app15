import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { UserData } from "../Context/userData";

export default function UpdatePostPage() {
  const { postId } = useParams();
  const { Token } = useContext(UserData);
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  async function updatePost(e) {
    e.preventDefault();

    const formData = new FormData();

    if (body) {
      formData.append("body", body);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (data.success == true) {
        console.log(data);
        navigate("/profile");
        toast.success("Post Updated Successfully 🔥");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update Failed ❌");
    }
  }

  return (
    <form onSubmit={updatePost} className="mb-5">
      <div className="bg-white shadow-md rounded-lg w-[50%] mx-auto p-4 flex flex-col gap-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          rows={3}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full rounded-lg border border-gray-300 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Update
        </button>
      </div>
    </form>
  );
}
