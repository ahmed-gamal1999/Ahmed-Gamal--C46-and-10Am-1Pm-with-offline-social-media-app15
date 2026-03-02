import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import pepoleImage from "../../../src/assets/DSC_9323.jpg";
import { UserData } from "../Context/userData.jsx";
import logo from "../../../src/assets/logo.png";
import toast from "react-hot-toast";
import axios from "axios";
import Notfcation from "../Notfcation/Notfcation.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const [userData, setuserData] = useState(null);
  let { Token, setToken } = useContext(UserData);
  useEffect(() => {
    async function getUserData() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/users/profile-data`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );

        if (data.success == true) {
          // console.log(data.data.user);
          setuserData(data.data.user);
        }
      } catch (error) {
        toast.error("erooooooooooooooooooorrrrrrr");
      }
    }
    getUserData();
  }, []);
  function signOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("login");
  }
  return (
    <>
      <nav className="bg-neutral-primary w-full border-b border-default">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center   rtl:space-x-reverse">
            <img src={logo} className="h-7 logo" alt="Flowbite Logo" />
          </Link>

          <div className="flex  items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-x-6">
            {Token !== null ? (
              <>
                <Notfcation />
                <button
                  type="button"
                  className="flex cursor-pointer text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userData?.photo}
                    alt="user photo"
                  />
                </button>
                <div
                  className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {userData?.name}
                    </span>
                    <span className="block text-body truncate">
                      {userData?.email}
                    </span>
                  </div>

                  <ul
                    className="p-2 text-sm text-body font-medium"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <Link
                        to="profile"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Profile
                      </Link>
                      <Link
                        to="editdata"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Profile Data
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={() => signOut()}
                        className=" cursor-pointer inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Sign Out
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <ul className="text-black  flex gap-x-8">
                  <li>
                    <Link to="login">Login </Link>
                  </li>
                  <li>
                    <Link to="register">Register </Link>
                  </li>
                </ul>
              </>
            )}
          </div>

          {/*           <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <Link
                  to="home"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary duration-200 md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="profile"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent duration-200 md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
}
