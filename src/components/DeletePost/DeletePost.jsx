import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeleteButton({ postId, token }) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post deleted successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Error deleting post");
    },
  });

  return (
    <AiOutlineClose
      className="text-gray-600 text-2xl cursor-pointer hover:text-red-500 transition"
      onClick={() => deleteMutation.mutate(postId)}
    />
  );
}
