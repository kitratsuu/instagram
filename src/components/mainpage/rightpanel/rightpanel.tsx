import { useContext } from "react";
import { pfp } from "../home";

export default function Rightpanel() {
  const [loading, error, profilepic, data] = useContext(pfp);

  return (
    <div className=" xl:min-w-[350px] xl:block lg:block hidden justify-center">
      <div className="flex mt-2 mr-8 flex-col text-center rounded-lg bg-slate-300 h-fit ">
        <div className="my-2 flex w-full items-center justify-between">
          <div className="w-[80px] h-[80px] rounded-full border-slate-400 flex-none  border-2">
            <img src={profilepic} className="w-full h-full rounded-full" />
          </div>
          <div>
            <button className="font-semibold">{data?.userName}</button>
            <div className="">{data?.fullName}</div>
          </div>
          <button className="text-blue-700 hover:text-blue-500">switch</button>
        </div>
      </div>
    </div>
  );
}
