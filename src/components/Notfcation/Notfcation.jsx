import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../Context/userData";
import { IoIosNotifications } from "react-icons/io";

export default function Notfcation() {
  const { Token } = useContext(UserData);
  const [open, setOpen] = useState(false);
  const [notfcation, setnotfcation] = useState(0);
  useEffect(() => {
    async function getAllNotfcation() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        if (data.success == true) {
          // console.log(data.data.notifications);
          setnotfcation(data?.data?.notifications);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllNotfcation();
  }, []);
  return (
    <>
      <div className="relative">
        {/* Icon */}
        <div
          onClick={() => setOpen(!open)}
          className="relative flex items-center justify-center 
                   w-10 h-10 rounded-full 
                   hover:bg-gray-200 transition cursor-pointer"
        >
          <IoIosNotifications className="text-2xl text-gray-700" />

          <span
            className="absolute -top-0 -right-0
                         bg-red-600 text-white 
                         text-[10px] font-bold 
                         min-w-[18px] h-[18px] 
                         flex items-center justify-center 
                         rounded-full px-1"
          >
            {notfcation.length}
          </span>
        </div>

        {open && (
          <div
            className="absolute right-0 mt-2 w-80 
                bg-white rounded-xl shadow-lg 
                border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-3 font-semibold border-b border-b-gray-200">
              Notifications
            </div>

            {notfcation.map((notf) => {
              return (
                <div
                  key={notf._id}
                  className="px-4 py-3 hover:bg-gray-100  border-b border-b-gray-200
                          cursor-pointer transition"
                >
                  <p className="text-sm">
                    <span className="font-semibold">{notf.actor.name}</span>{" "}
                    liked your post
                  </p>
                  <span className="text-xs text-gray-500">
                    {notf.createdAt.split(1, 8)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
