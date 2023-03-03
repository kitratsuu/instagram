import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useUniversalfetch } from "../../../functions/datafetchfire";
import { InfiScroll } from "../../../mainpage/datadisplayfuncs/infi-scroll";
import Post from "./post";

export default function Posts() {
  const auth = getAuth();
  const {
    data,
    error,
    loading,
    fetch: fetchdatacondition,
  } = useUniversalfetch(`users/${auth.currentUser?.uid}/POSTS`);
  return (
    <div className="grid grid-cols-3 grid-flow-row">
      <InfiScroll
        last={error}
        loadMore={() => {
          fetchdatacondition();
        }}
        loading={loading}
      >
        {data.map((e, i) => {
          return <Post key={i} item={e} />;
        })}
      </InfiScroll>
    </div>
  );
}
