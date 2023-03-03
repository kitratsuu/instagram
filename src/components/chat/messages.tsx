import React, { createContext, useContext, useState } from "react";
import Shareicon2 from "../../svgcomps/shareicon2";
import { chatdata } from "./chatscreen";
import Searchpeoplescreen from "./searchpeoplescreen";

export const chatstates = createContext<any>(0);

export default function Messages() {
  const [loading, error, profilepic, data] = useContext(chatdata);
  const [usersearchscreenstate, setUsersearchscreenstate] = useState(true);
  return (
    <chatstates.Provider
      value={{
        usersearchscreen: [usersearchscreenstate, setUsersearchscreenstate],
      }}
    >
      <div className="w-full h-screen text-white border-2 mt-2 border-white flex justify-center items-center">
        {usersearchscreenstate ? <Searchpeoplescreen /> : <></>}
        <div className="w-[80%] h-[90%] border-2 border-white flex">
          <div className="h-full w-[40%] border-2 border-white">
            <div className="h-[10%] w-full border-2 flex items-center border-white space-x-4 ">
              <div className="w-[40px] h-[40px] border-2 border-white rounded-full">
                <img
                  src={profilepic}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </div>
              <span className="text-white text-3xl">{data?.userName}</span>
            </div>
            <div className="h-[90%] w-full border-2 border-white">
              <span className="text-xl font-bold">Messages</span>
            </div>
          </div>
          <div className="h-full w-[60%] border-2 border-white">
            <div className="h-[10%] w-full border-2 border-white"></div>
            <div className="h-[90%] w-full border-2 border-white">
              <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                <Shareicon2 />
                <span className="text-2xl">Your messages appear here</span>
                <span className="text-xl">
                  You can send DMs to people here.
                </span>
                <button
                  onClick={() => {
                    setUsersearchscreenstate(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </chatstates.Provider>
  );
}
