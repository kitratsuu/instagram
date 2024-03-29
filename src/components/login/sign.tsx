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
          <div className="flex flex-col justify-center items-center w-[175px] h-[103px] bg-no-repeat">
            <span className="text-4xl font-black">Instagram</span>
          </div>
          <div className="flex flex-col space-y-4">
            <form
              autoCorrect="off"
              autoCapitalize="none"
              className="space-y-3 flex flex-col items-center"
              onSubmit={handleSubmit((data: any) => {
                signIn(data);
              })}
            >
              <label
                htmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <div className="relative mb-2">
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div> */}
                <input
                  id="input-group-1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  type={"email"}
                  {...register("email", { required: true })}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={"password"}
                  {...register("pass", { required: true })}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div>

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
