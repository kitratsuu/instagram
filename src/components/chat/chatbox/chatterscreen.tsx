import { useAtom } from "jotai";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useratom } from "../../mainpage/rightpanel/rightpanel";
import { useChatsfetch } from "../../functions/chatfunctions";
import { chatstates } from "../messages";
import { Basicdata, Chats } from "../../types/datafetch";
import { Timestamp, doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
    <div className="h-[90%] w-full border-2 border-slate-200">
      <div className="w-full h-[93%] flex flex-col justify-end items-center space-y-3">
        {fetchedchats.map((chat: any, index: any) => {
          return (
            <div key={index} className={`w-full`}>
              <span
                className={`${
                  chat.username == data?.userName ? "float-left" : "float-right"
                }`}
              >
                {chat.ch}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-[7%] w-full items-end justify-between flex">
        <input
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              handleclick;
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