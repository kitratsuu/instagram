import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  useFetchprofilepics,
  useFetchuserslist,
} from "../../functions/chatfunctions";
import { chatstates } from "../messages";
import Searchpeopledisplay from "./searchpeopledisplay";

export default function Searchpeoplescreen() {
  const { usersearchscreen } = useContext(chatstates);
  const [usersearchscreenstate, setUsersearchscreenstate] = usersearchscreen;
  const { error, loading, fetchedusers, postsFetch } = useFetchuserslist();
  useEffect(() => {
    postsFetch();
  }, []);

  return (
    <div className="absolute inset-0 z-20 w-screen h-screen flex justify-center bg-black backdrop-blur opacity-95 items-center">
      <div className="w-[400px] h-[500px] border-white border-2 p-2">
        <div className="w-full h-[18%] space-y-2">
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
        <div className="space-y-14 h-[82%] overflow-auto p-4 border-2">
          {fetchedusers.map((e: any, i) => {
            return <Searchpeopledisplay key={i} val={e} />;
          })}
        </div>
      </div>
    </div>
  );
}
