import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useUniversalfetch } from "../../../functions/datafetchfire";
import { InfiScroll } from "../../../mainpage/datadisplayfuncs/infi-scroll";
import Reel from "./reel";

export default function Reels() {
  const auth = getAuth();
  const {
    data,
    error,
    loading,
    fetch: fetchdatacondition,
  } = useUniversalfetch(`users/${auth.currentUser?.uid}/REELS`);

  return (
    <div className="grid grid-cols-3">
      <InfiScroll
        last={error}
        loadMore={() => {
          fetchdatacondition();
        }}
        loading={loading}
      >
        {data.map((e, i) => {
          return <Reel key={i} item={e} />;
        })}
      </InfiScroll>
    </div>
  );
}
