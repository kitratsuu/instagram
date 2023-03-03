import React, { useContext, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Shareicon from "../../svgcomps/shareicon";
import { useFetchreelsfromstorage } from "../functions/datafetchfire";
import { reelpfp } from "./reelpanel";

export default function Reeldisplay(props: any) {
  const [profilepic] = useContext(reelpfp);
  const {
    error,
    loading,
    fetchedreelurl,
    fetchedreelcoverpic,
    fetchpostfromstore,
  } = useFetchreelsfromstorage();
  useEffect(() => {
    fetchpostfromstore(props.item.folderuid);
  }, []);
  return (
    <div className="w-full h-[90%] flex space-x-3 rounded-lg snap-center snap-always">
      <div className="w-[90%] h-full border-2 border-slate-600 rounded-lg">
        <video
          src={fetchedreelurl}
          autoPlay={true}
          className="h-full w-full"
        ></video>
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
