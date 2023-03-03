import React, { createContext, useEffect, useState } from "react";
import { Sidepanel } from "../mainpage/left panel/leftpanel";
import Top from "../mainpage/topnav/top";
import { useProfilepicfetch } from "../profile/profilefunctions/profilefunctions";
import Getreels from "./getreels";

export const reelpfp = createContext<any>(0);

export default function Reelpanel() {
  const [topnav, setTopnav] = useState(false);
  const { loading, error, profilepic, picfetch } = useProfilepicfetch();

  useEffect(() => {
    picfetch();
  }, []);

  return (
    <reelpfp.Provider value={[profilepic]}>
      <div className="bg-black">
        <Top
          setval={(tf) => {
            setTopnav(tf);
          }}
          alval={topnav}
        />
        <div className="flex max-h-screen w-screen justify-center sm:justify-between md:justify-between lg:justify-between xl:justify-between">
          <Sidepanel state={topnav} />
          <Getreels />
        </div>
      </div>
    </reelpfp.Provider>
  );
}
