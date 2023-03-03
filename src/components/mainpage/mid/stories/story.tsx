import React from "react";

export default function Story({ items }: any) {
  return (
    <div className="w-[80px] h-[80px] m-2 rounded-full bg-white border-slate-400 flex-none  border-2">
      <span className="h-full w-full justify-center items-center flex ">
        {items}
      </span>
    </div>
  );
}
