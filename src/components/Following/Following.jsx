import { useContext, useEffect, useState } from "react";
import { UserData } from "../Context/userData";
import toast from "react-hot-toast";
import axios from "axios";

export default function Following() {
  const { Token, ID } = useContext(UserData);
  const [following, setfollowing] = useState([]);

  useEffect(() => {
    async function getFollowingData() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/users/${ID}/profile`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );
        if (data.success == true) {
          // console.log(data?.data?.user?.following);
          setfollowing(data?.data?.user?.following);
        }
      } catch (error) {
        toast.error(`eroooorororo getFollowingData`);
      }
    }

    getFollowingData();
  }, [following]);

  async function unFollow(ID) {
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
      if (data.success == true) {
        console.log(ID);
        toast.success("The follow was successfully cancelled.");
      }
    } catch (error) {
      toast.error("Unfollow Not proceed");
    }
  }
  return (
    <>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {following.map((f) => {
          return (
            <div
              key={f.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={f.photo}
                alt={`${f?.name} Photo`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {f.name}
                </h2>
                <div className="flex justify-around text-center mt-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Followers
                    </h3>
                    <p className="text-md font-bold text-gray-800">
                      {f.followersCount}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Following
                    </h3>
                    <p className="text-md font-bold text-gray-800">0</p>
                  </div>
                </div>
              </div>
              <div className="p-4 text-center">
                <button
                  onClick={() => {
                    unFollow(f.id);
                  }}
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Unfollow
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
