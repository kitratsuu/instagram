import React, { useContext, useState } from "react";
import { pfp } from "../../home";
import Story from "./story";

export default function Storypanel(props: any) {
  const [loading, error, profilepic, data] = useContext(pfp);

  return (
    <div className="scrollhide w-[full] h-[100px] flex flex-none overflow-auto mt-2 bg-slate-300 border-slate-300 rounded-lg border-2 snap-center">
      <div className="w-[80px] h-[80px] m-2 rounded-full bg-white border-slate-400 flex-none  border-2">
        <img src={profilepic} className="w-full h-full rounded-full" />
      </div>
      {props.items.map((e: string, key: any) => {
        return <Story items={e} key={key} />;
      })}
    </div>
  );
}
