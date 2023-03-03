import React, { useEffect, useState } from "react";
import Postpanel from "./posts/postpanel";
import Storypanel from "./stories/storypanel";

export default function Mid() {
  const [stories, setStories] = useState([
    "ravi",
    "raju",
    "tom",
    "kim",
    "jim",
    "ronny",
    "john",
  ]);

  return (
    <div className="sm:w-[420px] md:w-[420px] lg:w-[420px] xl:w-[420px] sm:mr-[40px] md:mr-[100px] lg:mr-[100px] ">
      <div className="w-[96%] max-w-[400px] h-screen ml-2 justify-center scrollhide overflow-y-auto snap-y snap-mandatory">
        <Storypanel items={stories} />
        <Postpanel />
      </div>
    </div>
  );
}
