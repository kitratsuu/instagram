import React, { RefObject, useContext, useEffect, useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Shareicon from "../../svgcomps/shareicon";
import { useFetchreelsfromstorage } from "../functions/datafetchfire";
import { reelpfp } from "./reelpanel";
import { useElement } from "../functions/chatfunctions";

export default function Reeldisplay(props: any) {
  const videodisplay = useRef<HTMLDivElement>(null);
  const videoref = useRef<HTMLVideoElement>(null);
  const isIntersecting = useElement(videodisplay, 0.6);
  const [profilepic] = useContext(reelpfp);
  const {
    error,
    loading,
    fetchedreelurl,
    fetchedreelcoverpic,
    fetchpostfromstore,
  } = useFetchreelsfromstorage();
  useEffect(() => {
    fetchpostfromstore(props.item.folderuid, props.item.uid);
  }, []);
  console.log(fetchedreelurl);

  useEffect(() => {
    if (isIntersecting) {
      videoref.current?.play();
    } else {
      videoref.current?.pause();
    }
    console.log("video intersecting", isIntersecting);
  }, [isIntersecting]);

  return (
    <div className="w-full h-[90%] flex space-x-3 rounded-lg snap-center snap-always">
      <div
        ref={videodisplay}
        className="w-[90%] h-full border-2 border-slate-600 rounded-lg"
      >
        {fetchedreelurl.length > 0 ? (
          <video
            ref={videoref}
            src={fetchedreelurl!}
            autoPlay={isIntersecting}
            className="h-full w-full"
          ></video>
        ) : (
          <></>
        )}
      </div>
      <div className="text-white h-full flex flex-col justify-end space-y-5">
        <button>
          <AiOutlineHeart size={30} />
        </button>
        <button>
          <FaRegComment size={25} />
        </button>
        <button>
          <Shareicon color="white" />
        </button>
        <button>
          <BsBookmark size={25} />
        </button>
        <button>
          <BsThreeDots size={22} />
        </button>
        <button>
          <img src={profilepic} alt="" className="rounded-full w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
