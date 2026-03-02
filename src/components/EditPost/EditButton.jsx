import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EditButton({ postId }) {
  const navigate = useNavigate();

  return (
    <FaRegEdit
      className="text-gray-600 text-2xl cursor-pointer hover:text-amber-500 transition"
      onClick={() => navigate(`/updatepost/${postId}`)}
    />
  );
}
