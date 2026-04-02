import React, { useState } from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [ErrMsg, setErrMsg] = useState(null);
  const navgate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  let schema = z
    .object({
      name: z.string().min(3, "!at Leaast 1 Char").max(15, "max chars is 15"),
      email: z.email("Invalid Email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Abc@1234",
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .refine((dateValue) => {
          const userDate = new Date(dateValue); // User Date
          const todayDate = new Date(); // Today Date
          todayDate.setHours(0, 0, 0, 0);
          return userDate < todayDate;
        }, "!Invalid Date"),

      gender: z.enum(["male", "female"], "Gender Required"),
    })
    .refine(
      (object) => {
        return object.password == object.rePassword;
      },
      {
        error: "Pass And Re Pass Not Matched",
        path: ["rePassword"],
      },
    );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });
  let { register, handleSubmit, formState } = form;

  async function onSubmit(values) {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signup`,
        values,
      );
      if (data.success == true) {
        toast.success("Registration Successfuly");
        navgate("/login");
        setisLoading(false);
        console.log(data.user.photo);
      }
    } catch (error) {
      setErrMsg("error");
      setisLoading(false);
      toast.error("Registration invalid");
    }
  }
  return (
    <>
      <h4 className="text-slate-900 max-w-md  mx-auto my-3">
        Register Page....
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto ">
        {ErrMsg != null ? (
          <h5 className="mb-3 text-white text-center bg-red-700 p-1 rounded-2xl capitalize">
            {`email already exists.`}
          </h5>
        ) : (
          ""
        )}
        {/* Name Input  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            {...register("name")}
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Name
          </label>
          {formState.errors.name ? (
            <p className="text-red-600">{formState.errors.name.message}</p>
          ) : null}
        </div>

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

        {/* Re Password Input  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            {...register("rePassword")}
            id="floating_rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_rePassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Re password
          </label>
          {formState.errors.rePassword ? (
            <p className="text-red-600">
              {formState.errors.rePassword.message}
            </p>
          ) : null}
        </div>

        {/* Date Input  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="dateOfBirth"
            {...register("dateOfBirth")}
            id="floating_date"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_date"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Choose date
          </label>
          {formState.errors.dateOfBirth ? (
            <p className="text-red-600">
              {formState.errors.dateOfBirth.message}
            </p>
          ) : null}
        </div>

        {/* Gender */}
        <div className="flex gap-8">
          {/* Male Input  */}
          <div className="flex items-center mb-4">
            <input
              id="male-option"
              type="radio"
              name="gender"
              {...register("gender")}
              value="male"
              className="w-4 h-4 text-neutral-primary border-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="male-option"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Male
            </label>
          </div>

          {/* Female Input  */}
          <div className="flex items-center mb-4">
            <input
              id="female-option"
              type="radio"
              name="gender"
              {...register("gender")}
              value="female"
              className="w-4 h-4 text-neutral-primary border-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="female-option"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Female
            </label>
            {formState.errors.gender ? (
              <p className="text-red-600">{formState.errors.gender.message}</p>
            ) : null}
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="text-white cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading == true ? (
            <i className="fa fa-spin fa-spinner"></i>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}
