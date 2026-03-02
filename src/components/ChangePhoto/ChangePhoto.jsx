import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../Context/userData";
import { data, useNavigate } from "react-router-dom";

export default function ChangePhoto() {
  const navigate = useNavigate();
  const { Token } = useContext(UserData);
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  }

  function onSubmitForm(e) {
    e.preventDefault();

    if (!Token) return toast.error("You are not logged in!");

    const fileInput = e.target.elements.photo.files[0];
    if (!fileInput) return toast.error("Please select a photo");

    const formData = new FormData();
    formData.append("photo", fileInput);

    axios
      .put("https://route-posts.routemisr.com/users/upload-photo", formData, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Photo changed successfully");
      })
      .catch((err) => toast.error("Error uploading photo"));
    navigate("/");
  }

  return (
    <form onSubmit={onSubmitForm} className="mb-5">
      <div className="bg-white shadow-md rounded-lg w-[50%] mx-auto p-4 flex flex-col gap-4">
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full rounded-lg border border-gray-300 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Change Photo
        </button>
      </div>
    </form>
  );
}
