import React, { useContext, useEffect, useRef, useState } from "react";
import { useChatsfetch } from "../../functions/chatfunctions";
import { chatstates } from "../messages";
import { Basicdata, Chats } from "../../types/datafetch";
import { Timestamp, doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { diffbetdates } from "../../functions/userfuncs2";

export default function Chatterscreen() {
  const { chatter } = useContext(chatstates);
  const [data, setData] = useState<Basicdata>();

  const [currchatter, setCurrchatter] = chatter;
  const {
    error: e,
    loading: l,
    fetchedchats,
    chatsFetch,
    chatsupload,
  } = useChatsfetch();

  useEffect(() => {
    if (currchatter != null) chatsFetch(currchatter.chatuid);
  }, [currchatter]);

  const message = useRef<any>();
  useEffect(() => {
    const uid = getAuth().currentUser!.uid;
    getDoc(doc(getFirestore(), "users/" + uid)).then((result) => {
      setData(result.data() as Basicdata);
    });
  }, []);

  const handleclick = () => {
    if (data != undefined) {
      const obj: Chats = {
        ch: message.current.value,
        timestamp: Timestamp.fromDate(new Date()),
        username: data?.userName,
      };
      message.current.value = "";
      chatsupload(currchatter.chatuid, obj);
    }
  };
  return (
    <div className="h-[90%] flex flex-col justify-end w-full border-2 border-slate-200">
      <div className="w-full max-h-[90%]  mb-3 justify-end space-y-3 scrollhide overflow-y-auto">
        {fetchedchats.map((chat: any, index: any) => {
          return (
            <div
              key={index}
              className={`w-full h-[35px] flex ${
                chat.username == data?.userName
                  ? "justify-end"
                  : "justify-start"
              } border-transparent border-2`}
            >
              {chat.username == data?.userName ? (
                <div className="h-full flex justify-end items-end">
                  <span className="text-[10px] opacity-70">
                    {diffbetdates(chat.timestamp)}
                  </span>
                </div>
              ) : (
                ""
              )}
              <span
                className={` text-[10px]${
                  chat.username == data?.userName
                    ? "float-right bg-green-800 px-3 py-1 text-right min-w-[150px] rounded-tl-2xl"
                    : "float-left bg-zinc-500 px-3 py-1 text-left min-w-[150px] rounded-tr-2xl"
                }`}
              >
                {chat.ch}
              </span>
              {chat.username == data?.userName ? (
                ""
              ) : (
                <div className="h-full flex justify-end items-end">
                  <span className="text-[10px] opacity-70">
                    {diffbetdates(chat.timestamp)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-[8%] w-full items-end justify-between flex">
        <input
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              console.log("clicked");
              handleclick();
            }
          }}
          ref={message}
          type="text"
          className="bg-slate-800 h-10 w-full"
          placeholder="Type message"
        />
        <button
          onClick={handleclick}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
    </div>
  );
}
