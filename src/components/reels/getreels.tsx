import React from "react";
import { useUniversalfetch } from "../functions/datafetchfire";
import { InfiScroll } from "../mainpage/datadisplayfuncs/infi-scroll";
import Reeldisplay from "./reeldisplay";

export default function Getreels() {
  const {
    data,
    error,
    loading,
    fetch: fetchdatacondition,
  } = useUniversalfetch("GLOBAL_REELS");
  const list = ["a", "b", "c", "d", "e", "f"];
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <InfiScroll
        last={error}
        loadMore={() => {
          fetchdatacondition();
        }}
        loading={loading}
      >
        <div className="w-[380px] h-[90%] scrollhide overflow-y-scroll space-y-4 my-4 snap-y snap-mandatory">
          {data.map((e, i) => {
            return <Reeldisplay item={e} key={i} />;
          })}
        </div>
      </InfiScroll>
    </div>
  );
}
