import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { UserData } from "../Context/userData";

export default function UserProfile() {
  const { userId } = useParams();
  const [userData, setuserData] = useState();
  const { Token } = useContext(UserData);
  useEffect(() => {
    async function getUserProfile() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/users/${userId}/profile`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        if (data.success == true) {
          console.log(data.data.user);
          setuserData(data?.data?.user);
        }
      } catch (error) {
        toast.error("errrrorrrrrr getUserProfile");
      }
    }
    getUserProfile();
  }, []);
  return (
    <>
      <div className="flex justify-center mt-8 px-4">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 max-w-sm w-full transition hover:shadow-2xl">
          <div className="relative">
            <img
              src={
                userData?.photo ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={`${userData?.name || "User"} Photo`}
              className="w-full h-52 object-cover"
            />
          </div>

          <div className="p-5 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {" "}
              <span className="text-gray-400">Name Is : </span>
              {userData?.name || "Unknown User"}
            </h2>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              <span className="text-gray-400">User Name Is : </span>
              {userData?.username || "Unknown User"}
            </h3>

            <div className="flex justify-around mt-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Followers</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {userData?.followersCount || 0}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Following</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {userData?.followingCount || 0}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {/*  <button
                // onClick={() => toggleFollow(userData?.id)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Follow
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
