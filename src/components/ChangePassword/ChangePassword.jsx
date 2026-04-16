import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserData } from "../Context/userData";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { Token, setToken } = useContext(UserData);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  async function onSubmitForm(values) {
    try {
      const { data } = await axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        values,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (data.success == true) {
        // console.log(data);
        toast.success("password Changed");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userID");
        navigate("/login");
        setToken(null);
      }
    } catch (error) {
      toast.error("errrrorr");
    } finally {
      reset();
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="w-6/12 bg-gray-200 p-4 mx-auto  rounded-md  flex flex-col gap-4 mt-4">
        <h1 className="text-center  text-2xl">Change Password Form</h1>
        <label htmlFor="oldPass"> Old Password </label>
        <input {...register("password")} type="text" id="oldPass" />

        <label htmlFor="newPass"> New Password </label>
        <input {...register("newPassword")} type="text" id="newPass" />
        <button
          type="submit"
          className="cursor-pointer mt-3 w-fit mx-auto bg-gray-300 py-2 px-4 rounded-md "
        >
          Update Password
        </button>
      </div>
    </form>
  );
}
