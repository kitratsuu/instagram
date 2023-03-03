import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Shareicon from "../../../../svgcomps/shareicon";
import { diffbetdates } from "../../../functions/userfuncs2";
import { Basicdata } from "../../../types/datafetch";
import { useFetchpostsfromstorage } from "../../../functions/datafetchfire";

export default function Posts(props: any) {
  const { error, loading, fetchedposturl, fetchpostfromstore } =
    useFetchpostsfromstorage();
  const [data, setData] = useState<Basicdata>();
  useEffect(() => {
    const uid = getAuth().currentUser!.uid;
    getDoc(doc(getFirestore(), "users/" + uid)).then((result) => {
      setData(result.data() as Basicdata);
    });
    fetchpostfromstore(props.item.postuid, props.item.uid);
  }, []);
  return (
    <div className="min-h-[500px] h-fit bg-slate-300 border-slate-300 space-y-2 mt-2 rounded-lg border-2 snap-center snap-always">
      <div className="w-full h-[50px] flex items-center space-x-2">
        <div className="h-full w-[50px] border-2 border-black rounded-full"></div>
        <div className="flex items-end space-x-4">
          <span className="">@{props.item.userName}</span>
          <span className="text-xs ">
            {diffbetdates(props.item.timeofupload)}
          </span>
        </div>
      </div>
      <div className="w-full min-h-[500px] border-2 border-black">
        <img className="w-full h-[500px]" src={fetchedposturl} />
      </div>
      <div className="w-full h-fit">
        <div className="flex w-10 h-10 space-x-4">
          <button>
            <AiOutlineHeart size={30} />
          </button>
          <button>
            <FaRegComment size={25} />
          </button>
          <button>
            <Shareicon color="black" />
          </button>
        </div>
        <span className="">{props.item.likes} likes</span>
        <div className="space-x-3">
          <span className="font-extrabold text-base">
            {props.item.userName}
          </span>
          <span className="">{props.item.captionofpost}</span>
        </div>
        <button className="text-slate-700 hover:text-slate-900">
          View {props.item.commentscount} comments
        </button>
      </div>
    </div>
  );
}
