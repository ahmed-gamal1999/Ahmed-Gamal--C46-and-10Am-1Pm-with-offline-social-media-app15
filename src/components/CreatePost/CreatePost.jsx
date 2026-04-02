import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserData } from "../Context/userData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { Token } = useContext(UserData);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  async function createPost(values) {
    const form = new FormData();
    form.append("body", values.body);

    if (values.image != null) {
      form.append("image", values.image[0]);
    }

    try {
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/posts`,
        form,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      if (data.message == "success") {
        toast.success("Post Added!");
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Post Not Added!");
    } finally {
      reset();
    }
  }
  return (
    <form onSubmit={handleSubmit(createPost)} className="mb-5 ">
      <div className="bg-white shadow-md rounded-lg w-[50%] mx-auto p-4 flex flex-col gap-4 ">
        {/* Text Input */}
        <textarea
          {...register("body")}
          placeholder="What's on your mind?"
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />

        {/* File Input */}
        <input
          {...register("image")}
          type="file"
          className="w-full rounded-lg border border-gray-300 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Post
        </button>
      </div>
    </form>
  );
}
