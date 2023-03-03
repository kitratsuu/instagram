import { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Menubar(props: { show: boolean }) {
  return (
    <div
      className={`absolute space-y-2 w-[250px] z-20 h-fit border-4 left-40 bottom-28 border-slate-400 bg-slate-800 rounded-lg ${
        props.show ? "block" : "hidden"
      }`}
    >
      <button className="flex w-full items-center p-2 text-base font-normal text-gray-200  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="flex-1 ml-3 text-left whitespace-nowrap">Setting</span>
      </button>
      <button className="flex w-full items-center p-2 text-base font-normal text-gray-200  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="flex-1 ml-3 text-left whitespace-nowrap">Saved</span>
      </button>
      <button className="flex w-full items-center p-2 text-base font-normal text-gray-200  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          Switch appearance
        </span>
      </button>
      <button className="flex w-full items-center p-2 text-base font-normal text-gray-200  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          Your activity
        </span>
      </button>
      <button className="flex w-full items-center p-2 text-base font-normal text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          Report a problem
        </span>
      </button>
      <button className="flex w-full items-center p-2 text-base font-normal text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          Switch accounts
        </span>
      </button>
      <button
        onClick={() => {
          signOut(getAuth());
        }}
        className="flex w-full items-center p-2 text-base font-normal text-gray-200 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span className="flex-1 ml-3 text-left whitespace-nowrap">Log out</span>
      </button>
    </div>
  );
}
