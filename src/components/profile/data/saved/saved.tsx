import React from "react";

export default function Saved() {
  return (
    <div className="w-full h-full">
      <div className="sm:flex-row md:flex-row lg:flex-row flex flex-col justify-between items-center space-y-4 mx-5">
        <span className="text-white">
          Only you can see what you have saved.
        </span>
        <button className="bg-slate-50 p-2 w-fit rounded-md hover:bg-slate-300">
          + New-Collection
        </button>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[350px] h-[400px] border-2 border-slate-200 my-10">
          <button className="text-white text-2xl bg-gradient-to-r from-black hover:from-slate-900 via-slate-900 hover:via-slate-700 to-black hover:to-slate-900 w-full h-full flex items-end">
            All Posts
          </button>
        </div>
      </div>
    </div>
  );
}
