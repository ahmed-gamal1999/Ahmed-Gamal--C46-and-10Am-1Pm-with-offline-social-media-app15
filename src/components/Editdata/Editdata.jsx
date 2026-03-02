import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../Context/userData";
import { useNavigate } from "react-router-dom";

export default function Editdata() {
  const mavigate = useNavigate();
  const [userData, setuserData] = useState();
  const { Token } = useContext(UserData);
  useEffect(() => {
    async function getUserData() {
      try {
        const { data } = await axios.get(
          "https://route-posts.routemisr.com/users/profile-data",
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        if (data.success == true) {
          setuserData(data.data.user);
          // console.log(data.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-2xl shadow-lg p-6 text-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={userData?.photo}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {userData?.name}
          </h2>

          {/* Email */}
          <p className="text-gray-500 text-sm mt-1"> {userData?.email} </p>

          {/* Divider */}
          <div className="my-4 border-t"></div>

          {/* Info Section */}
          <div className="space-y-2 text-left text-gray-700 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Gender:</span>
              <span> {userData?.gender} </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Date of Birth:</span>
              <span> {userData?.dateOfBirth} </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Created At:</span>
              <span> {userData?.createdAt} </span>
            </div>
          </div>

          {/* ID */}
          <p className="mt-6 text-xs text-gray-400 break-all">ID: asdasdasd</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                mavigate("/Change-Password");
              }}
              type="submit"
              className="cursor-pointer mt-3  bg-gray-300 py-2 px-4 rounded-md "
            >
              Change Password
            </button>
            <button
              onClick={() => {
                mavigate("/change-photo");
              }}
              type="submit"
              className="cursor-pointer mt-3  bg-gray-300 py-2 px-4 rounded-md "
            >
              Change Profile Picture
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
