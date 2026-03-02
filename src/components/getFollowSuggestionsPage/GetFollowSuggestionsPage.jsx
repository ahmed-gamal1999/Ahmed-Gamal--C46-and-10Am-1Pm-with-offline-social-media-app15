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
          { headers: { Authorization: `Bearer ${Token}` } },
        );
        if (data.success === true) {
          // نضيف لكل user حالة isFollowing بشكل افتراضي false
          const usersWithFollowState = data.data.suggestions.map((user) => ({
            ...user,
            isFollowing: false,
          }));
          setfollowData(usersWithFollowState);
        }
      } catch (error) {
        toast.error("حدث خطأ في جلب الاقتراحات");
      }
    }
    getFollow();
  }, [Token]);

  async function addFollow(ID) {
    try {
      await axios.put(
        `https://route-posts.routemisr.com/users/${ID}/follow`,
        {},
        { headers: { Authorization: `Bearer ${Token}` } },
      );

      // نحدث الحالة محليًا لكل user
      setfollowData((prev) =>
        prev.map((user) =>
          user._id === ID ? { ...user, isFollowing: !user.isFollowing } : user,
        ),
      );
    } catch (error) {
      toast.error("حدث خطأ عند المتابعة");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-72">
      <h2 className="text-lg font-semibold mb-3 text-center">Suggestions</h2>
      {followData.map((acc) => (
        <div
          key={acc._id}
          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded transition"
        >
          <div className="flex items-center gap-3">
            <img
              src={acc.photo}
              alt={acc.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{acc.name}</span>
              <span className="text-xs text-gray-500">{acc.username}</span>
              <span className="text-xs text-gray-400">
                {acc.followersCount} followers
              </span>
            </div>
          </div>
          <button
            onClick={() => addFollow(acc._id)}
            className={`px-3 py-1 rounded-lg font-semibold text-sm transition cursor-pointer
            ${acc.isFollowing ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            {acc.isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}
