import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import {
  useFetchprofilepics,
  useFetchselecteduserslist,
} from "../functions/chatfunctions";
import { chatstates } from "./messages";

export default function Chatters(props: { details: any }) {
  const { error, loading, fetchedusers, selecteduserFetch } =
    useFetchselecteduserslist();
  const { chatter } = useContext(chatstates);
  const [currchatter, setCurrchatter] = chatter;
  const { picfetch, photourl } = useFetchprofilepics();

  useEffect(() => {
    selecteduserFetch(props.details.userName);
  }, []);
  useEffect(() => {
    if (fetchedusers[0] !== undefined) {
      picfetch(fetchedusers[0]?.uid);
      console.log(fetchedusers);
    }
  }, [fetchedusers]);

  const handleclick = () => {
    setCurrchatter(props.details);
  };

  return (
    <button
      onClick={handleclick}
      className="w-full flex hover:bg-slate-900 items-center space-x-4"
    >
      <div className="w-10 h-10 border-2 border-purple-400 rounded-full">
        <img className="w-full h-full rounded-full" src={photourl!} alt="" />
      </div>
      <div className="">
        <span>{props.details.userName}</span>
      </div>
    </button>
  );
}
