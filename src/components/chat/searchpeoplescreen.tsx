import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import {
  useFetchprofilepics,
  useFetchuserslist,
} from "../functions/chatfunctions";
import { chatstates } from "./messages";

export default function Searchpeoplescreen() {
  const { usersearchscreen } = useContext(chatstates);
  const [usersearchscreenstate, setUsersearchscreenstate] = usersearchscreen;
  const { error, loading, fetchedusers, postsFetch } = useFetchuserslist();
  useEffect(() => {
    postsFetch();
  }, []);
  useEffect(() => {
    console.log(fetchedusers);
  }, [fetchedusers]);

  return (
    <div className="absolute inset-0 z-20 w-screen h-screen flex justify-center bg-black backdrop-blur opacity-95 items-center">
      <div className="w-[400px] h-[500px] border-white border-2 space-y-3 p-2">
        <div className="w-full h-[80px] space-y-3">
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                setUsersearchscreenstate(false);
              }}
              className="w-6 h-6 hover:w-5 hover:h-5"
            >
              <AiOutlineClose color="white" size={30} />
            </button>
            <span className="font-bold text-lg">New Message</span>
            <button className="text-blue-500 text-lg font-bold">Next</button>
          </div>
          <div className=" w-full flex items-center justify-between">
            <span className="text-xl w-[10%] mx-1">To : </span>
            <input
              type="text"
              className="bg-slate-800 h-9 rounded-lg w-[90%]"
              placeholder="Search People..."
            />
          </div>
        </div>
        <div className="space-y-4 h-[400px] overflow-scroll">
          {fetchedusers.map((e: any, i) => {
            return (
              <div key={i} className="w-full h-4 flex text-white">
                <div className="w-4 h-4 border-2 rounded-full">
                  <img src={e.profilepicurl} alt="" />
                </div>
                <span>{e.userName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
