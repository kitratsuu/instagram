import React, { useContext } from "react";
import Shareicon2 from "../../../svgcomps/shareicon2";
import { chatstates } from "../messages";

export default function Defaultscreen() {
  const { usersearchscreen } = useContext(chatstates);
  const [usersearchscreenstate, setUsersearchscreenstate] = usersearchscreen;
  return (
    <div className="h-[90%] w-full border-2 border-slate-200">
      <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
        <Shareicon2 />
        <span className="text-2xl">Your messages appear here</span>
        <span className="text-xl">You can send DMs to people here.</span>
        <button
          onClick={() => {
            setUsersearchscreenstate(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 border-slate-200 font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
