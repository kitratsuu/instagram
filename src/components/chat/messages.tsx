import React, { createContext, useContext, useEffect, useState } from "react";
import Shareicon2 from "../../svgcomps/shareicon2";
import { chatdata } from "./chatscreen";
import Searchpeoplescreen from "./searchpeope/searchpeoplescreen";
import { useChatsfetch, useFetchchatterlist } from "../functions/chatfunctions";
import Chatters from "./chatters";
import Defaultscreen from "./chatbox/defaultscreen";
import Chatterscreen from "./chatbox/chatterscreen";

export const chatstates = createContext<any>(0);

export default function Messages() {
  const { pfp } = useContext(chatdata);
  const [loading, error, profilepic, data] = pfp;
  const [currchatter, setCurrchatter] = useState<{
    chatuid: string;
    userName: string;
  } | null>();
  const [usersearchscreenstate, setUsersearchscreenstate] = useState(false);
  const {
    error: ferror,
    loading: floading,
    fetchedchatters,
    chattersFetch,
  } = useFetchchatterlist();

  useEffect(() => {
    chattersFetch();
  }, [usersearchscreenstate]);

  return (
    <chatstates.Provider
      value={{
        usersearchscreen: [usersearchscreenstate, setUsersearchscreenstate],
        chatter: [currchatter, setCurrchatter],
      }}
    >
      <div className="w-full h-screen text-white border-2 mt-2 scrollhide border-white flex justify-center items-center">
        {usersearchscreenstate ? <Searchpeoplescreen /> : <></>}
        <div className="w-[80%] h-[90%] border-2 border-slate-400 rounded-lg flex">
          <div className="h-full w-[40%]">
            <div className="h-[10%] w-full border-2 flex max-md:hidden items-center border-slate-300 space-x-4 ">
              <div className="max-w-[40px] max-h-[40px] w-full h-full border-2 border-slate-200 rounded-full">
                <img
                  src={profilepic}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </div>
              <span className="text-white text-3xl max-md:text-1xl">
                {data?.userName}
              </span>
            </div>
            <div className="h-[90%] w-full border-2 border-slate-200 space-y-4">
              <span className="text-xl font-bold">Messages</span>
              {fetchedchatters.map((e, i) => {
                return <Chatters key={i} details={e} />;
              })}
            </div>
          </div>
          <div className="h-full  w-[60%] border-0 border-slate-200">
            <div className="h-[10%] w-full border-2 flex justify-end items-center border-slate-200">
              <button
                onClick={() => {
                  setUsersearchscreenstate(true);
                }}
                className="bg-blue-500 hover:bg-blue-700 border-slate-200 font-bold py-2 px-4 rounded"
              >
                Search New user
              </button>
            </div>
            {fetchedchatters.length > 0 ? <Chatterscreen /> : <Defaultscreen />}
          </div>
        </div>
      </div>
    </chatstates.Provider>
  );
}
