import React from "react";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteComment({ commentId, postId, token, onDeleted }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () =>
      axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      if (onDeleted) onDeleted(commentId);
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: () => {
      toast.error("Error deleting comment");
    },
  });

  return (
    <MdDelete
      className="cursor-pointer text-gray-500 hover:text-red-700"
      onClick={() => deleteMutation.mutate()}
    />
  );
}
