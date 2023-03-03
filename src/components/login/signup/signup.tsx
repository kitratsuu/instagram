import { useState } from "react";
import Input from "../input";

import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { deleteCurrUser, signUpNew } from "../../functions/userfncs";
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { loading, error, newUser } = signUpNew();

  return (
    <div className={`h-full flex`}>
      <div className="flex flex-col my-auto items-center w-full space-y-3">
        <div className="flex flex-col space-y-3 items-center w-[400px] h-fit border-2 border-slate-300">
          <div className="flex flex-col text-center items-center">
            <div className="flex flex-col text-center items-center w-[175px] h-[103px] bg-no-repeat bg-[url('https://static.cdninstagram.com/rsrc.php/v3/y-/r/yXM3FgMdVNX.png')]"></div>
            <span className="text-xl font-bold text-slate-400 mx-10">
              Sign up to see photoes of your friends and family
            </span>
          </div>
          <div className="">
            <button
              type="button"
              className="text-white bg-[#1254e4] hover:bg-[#1254e4]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
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
          </div>
          <div className="">
            <span>OR</span>
          </div>
          <div className="flex flex-col space-y-4">
            <form
              className="space-y-3 flex flex-col items-center"
              onSubmit={handleSubmit((data: any) => {
                newUser(data);
              })}
            >
              <input
                placeholder="Email"
                className="rounded-lg"
                type={"email"}
                {...register("email", { required: true })}
              />

              <input
                placeholder="Full-name"
                className="rounded-lg"
                type="text"
                {...register("fname", { required: true })}
              />
              <input
                placeholder="Username"
                className="rounded-lg"
                type="text"
                {...register("uname", { required: true })}
              />
              <input
                placeholder="Password"
                className="rounded-lg"
                type="password"
                {...register("pass", { required: true })}
              />
              <div className="flex flex-col text-center mx-10 space-y-3">
                <span>
                  People who use our service may have uploaded your contact
                  information to Instagram.{" "}
                  <a className="text-blue-400" href="#">
                    Learn More
                  </a>
                </span>
                <span>
                  By signing up, you agree to our{" "}
                  <a className="text-blue-400" href="#">
                    Terms
                  </a>
                  {" ,"}
                  <a className="text-blue-400" href="#">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a className="text-blue-400" href="#">
                    Cookies Policy
                  </a>
                  {" ."}
                </span>
              </div>
              <input
                type="submit"
                value="Sign up"
                className="text-white bg-[#1254e4] hover:bg-[#1254e4]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
              />
            </form>
            <div className="flex justify-center">
              {loading ? <Oval width={40} color="black" /> : ""}
            </div>
            <div className="">
              {error !== null ? (
                <span className="text-red-500">{error}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <Haveanaccount />
      </div>
    </div>
  );
}

export function Haveanaccount() {
  const navigate = useNavigate();
  const { delU, error } = deleteCurrUser();

  return (
    <div className="">
      <div className="flex flex-col mb-4 space-y-3 items-center w-[400px] h-fit border-2 border-slate-300">
        <span className="m-6">
          Have an account?{" "}
          <button
            className="text-blue-400 hover:text-blue-300"
            onClick={() => {
              delU();
              navigate("/login");
            }}
          >
            Login
          </button>
        </span>
      </div>
    </div>
  );
}
