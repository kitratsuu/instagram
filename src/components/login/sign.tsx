import React, { useState } from "react";
import Input from "./input";
import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authStatus } from "../functions/userfncs";
import { useForm, useFormState } from "react-hook-form";

export default function Sign() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { loading, error, signIn } = authStatus();

  return (
    <div className={`h-full flex bg-slate-200`}>
      <div className="flex flex-col w-full my-auto items-center space-y-3">
        <div className="flex flex-col space-y-8 items-center w-[400px] h-fit border-2 bg-white rounded-md border-slate-500">
          <div className="flex flex-col w-[175px] h-[103px] bg-no-repeat bg-[url('https://static.cdninstagram.com/rsrc.php/v3/y-/r/yXM3FgMdVNX.png')]"></div>
          <div className="flex flex-col space-y-4">
            <form
              autoCorrect="off"
              autoCapitalize="none"
              className="space-y-3 flex flex-col items-center"
              onSubmit={handleSubmit((data: any) => {
                signIn(data);
              })}
            >
              <input
                placeholder="Email"
                className="rounded-lg"
                type={"email"}
                {...register("email", { required: true })}
              />
              <input
                placeholder="Password"
                className="rounded-lg"
                type={"password"}
                {...register("pass", { required: true })}
              />

              <input
                type="submit"
                value="Log in"
                className="text-white bg-[#1254e4] hover:bg-[#1254e4]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-base w-full py-2.5 inline-flex justify-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
              />
            </form>
            <div className="flex justify-center">
              {loading ? <Oval width={40} color="black" /> : <></>}
            </div>
            <div className="">
              {error !== null ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <span className="font-semibold">OR</span>
          <button
            type="button"
            className="text-blue-800  hover:text-blue-600 font-bold rounded-lg text-base px-5 py-2.5 inline-flex items-center"
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5 bg-blue-800 text-white"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook-f"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
              ></path>
            </svg>
            Log in with Facebook
          </button>
          <button className="text-sm text-blue-800 hover:text-blue-600 pb-3">
            Forgot password?
          </button>
        </div>
        <div className="">
          <div className="flex flex-col mb-4 space-y-3 bg-slate-100 items-center w-[400px] h-fit border-2 rounded-md border-slate-500">
            <span className="m-6">
              Dont have an account?{" "}
              <button
                className="text-blue-600 hover:text-blue-400"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
