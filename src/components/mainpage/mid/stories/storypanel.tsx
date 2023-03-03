import React, { useState } from "react";
import Story from "./story";

export default function Storypanel(props: any) {
  return (
    <div className="scrollhide w-[full] h-[100px] flex flex-none overflow-auto mt-2 bg-slate-200 border-slate-300 rounded-lg border-2 snap-center">
      {props.items.map((e: string, key: any) => {
        return <Story items={e} key={key} />;
      })}
    </div>
  );
}
