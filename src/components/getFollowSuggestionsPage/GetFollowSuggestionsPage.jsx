import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../Context/userData";

export default function GetFollowSuggestionsPage() {
  const [followData, setfollowData] = useState([]);
  const { Token } = useContext(UserData);
  useEffect(() => {
    async function getFollow() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/users/suggestions?limit=10`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        if (data.success == true) {
          setfollowData(data?.data?.suggestions);
        }
      } catch (error) {
        toast.error("errrrororooror");
      }
    }

    getFollow();
  }, []);

  async function addFollow(ID) {
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/users/${ID}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      console.log(data);
    } catch (error) {
      toast.error("errrorrr");
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 w-60">
        <h2 className="text-lg font-semibold mb-3 text-center">Suggestion</h2>
        {followData.map((acc) => {
          return (
            <div
              key={acc._id}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={acc.photo}
                  alt="Ahmed Bahnasy"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm"> {acc.name} </span>
                  <span className="text-xs text-gray-500">{acc.username}</span>
                  <span className="text-xs text-gray-400">
                    {acc.followersCount} mutual followers
                  </span>
                </div>
              </div>
              <button
                onClick={() => addFollow(acc._id)}
                className="text-blue-500 cursor-pointer font-semibold text-sm hover:text-blue-700 transition"
              >
                Follow
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
