import { useContext, useEffect, useRef, useState } from "react";
import {
  useCreatechat,
  useElement,
  useFetchchatterlist,
  useFetchprofilepics,
} from "../../functions/chatfunctions";
import { AiOutlineClose } from "react-icons/ai";
import { chatdata } from "../chatscreen";
import { Basicdata } from "../../types/datafetch";
import { Timestamp } from "firebase/firestore";
import { chatstates } from "../messages";
import { useNavigate } from "react-router-dom";

export default function Searchpeopledisplay(props: { val: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useElement(ref);
  const { picfetch, photourl } = useFetchprofilepics();
  const [firstchatscreen, setFirstchatscreen] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      picfetch(props.val?.uid);
    }
  }, [isIntersecting]);

  function handlechatting() {
    console.log("its working");
    setFirstchatscreen(true);
  }

  return (
    <div ref={ref} className="w-full h-4 flex">
      <button
        onClick={handlechatting}
        className="w-full h-full flex items-center space-x-2 text-white"
      >
        <div className="w-10 h-10 border-2 rounded-full">
          <img className="w-full h-full rounded-full" src={photourl!} alt="" />
        </div>
        <span>{props.val.userName}</span>
      </button>
      {firstchatscreen ? (
        <Firstmessagescreen
          firstchatscreenstate={(val: boolean) => setFirstchatscreen(val)}
          userdetails={props.val}
          pfp={photourl!}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function Firstmessagescreen(props: {
  firstchatscreenstate: (val: boolean) => void;
  userdetails: any;
  pfp: string;
}) {
  const message = useRef<any>();
  const { error, loading, createChat } = useCreatechat();
  const { curruser } = useContext(chatdata);
  const [data, setData] = curruser;
  const { usersearchscreen } = useContext(chatstates);
  const [usersearchscreenstate, setUsersearchscreenstate] = usersearchscreen;

  const handlesubmit = async () => {
    console.log({
      ch: message.current.value,
      timestamp: Timestamp.fromDate(new Date()),
      username: curruser.userName,
    });
    await createChat(
      { user1: data.userName, user2: props.userdetails.userName },
      {
        ch: message.current.value,
        timestamp: Timestamp.fromDate(new Date()),
        username: data.userName,
      },
      props.userdetails.uid
    );
    if (error == null) {
      props.firstchatscreenstate(false);
      setUsersearchscreenstate(false);
    }
  };
  return (
    <div className="absolute inset-0 z-20 w-screen h-screen flex justify-center bg-black backdrop-blur opacity-95 items-center">
      <div className="w-[400px] h-fit space-y-4 border-amber-600 border-2 rounded-lg p-2">
        <div className="w-full h-fit space-y-6 ">
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                props.firstchatscreenstate(false);
              }}
              className="w-6 h-6 hover:w-5 hover:h-5"
            >
              <AiOutlineClose color="white" size={30} />
            </button>
            <div className="w-full flex justify-center">
              <span className="font-bold text-lg">Send your first message</span>
            </div>
          </div>
          <div className=" w-full  space-y-3">
            <div className="w-full justify-center flex">
              <span className="text-xl mx-1">
                {props.userdetails.userName}{" "}
              </span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
                <img
                  className="w-full h-full rounded-full"
                  src={props.pfp}
                  alt="profile-pic"
                />
              </div>
            </div>
            <input
              ref={message}
              type="text"
              className="bg-slate-800 h-9 rounded-lg w-full"
              placeholder="Type message"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handlesubmit}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-[4px] px-6 border-b-4 border-blue-700 hover:border-blue-500 active:bg-blue-800 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
