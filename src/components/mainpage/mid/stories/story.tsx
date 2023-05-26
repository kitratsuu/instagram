import React from "react";

export default function Story({ items }: any) {
  return (
    <div className="w-[80px] h-[80px] m-2 rounded-full bg-white border-slate-400 flex-none  border-2">
      <img
        src="https://source.unsplash.com/random"
        alt="random image"
        className="h-full w-full rounded-full"
      />
    </div>
  );
}
