import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserData } from "../Context/userData";
import toast from "react-hot-toast";

export default function Login() {
  let { Token, setToken } = useContext(UserData);

  const [isLoading, setisLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const navgate = useNavigate();
  let schema = z.object({
    email: z.email("Invalid Email"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Abc@1234",
      ),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  let { register, handleSubmit, formState } = form;

  /*   let { onChange, onBlur, name, ref } = register();*/

  /*  async function loginFunc(values) {
    setisLoading(true);
    await axios
      .post(`https://route-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        if (data.success == true) {
          console.log(data);

          // localStorage.setItem("userToken", res.data.token);
          // navgate("/");
          // setToken(res.data.token);
          // setisLoading(false);
          // // toast.success("Login Successfuly");
        }
      })
      .catch((err) => {
        setisLoading(false);
        toast.error("Login Failed!");
      });
  } */

  async function loginFunc(values) {
    try {
      setisLoading(true);
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signin`,
        values,
      );
      if (data.success == true) {
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userID", data.data.user._id);
        console.log(data.data.user._id);

        setToken(data.data.token);
        setisLoading(false);
        toast.success("Login Successfuly");
        navgate("/");
      }
    } catch (error) {
      setisLoading(false);
      toast.error("Login Failed!");
    }
  }
  return (
    <>
      <h4 className="text-slate-900 max-w-md  mx-auto my-3">Login Page....</h4>
      <form onSubmit={handleSubmit(loginFunc)} className="max-w-md mx-auto">
        {ErrMsg != null ? (
          <h5 className="mb-3 text-white text-center bg-red-700 p-1 rounded-2xl capitalize">
            {`email already exists.`}
          </h5>
        ) : (
          ""
        )}

        {/* Email Input  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            {...register("email")}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your email
          </label>
          {formState.errors.email ? (
            <p className="text-red-600">{formState.errors.email.message}</p>
          ) : null}
        </div>

        {/* Password Input  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            {...register("password")}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your password
          </label>{" "}
          {formState.errors.password ? (
            <p className="text-red-600">{formState.errors.password.message}</p>
          ) : null}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading == true ? (
            <i className="fa fa-spin fa-spinner"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
