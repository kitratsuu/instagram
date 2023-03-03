import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Sidepanel } from "../mainpage/left panel/leftpanel";
import Top from "../mainpage/topnav/top";
import { useProfilepicfetch } from "../profile/profilefunctions/profilefunctions";
import { Basicdata } from "../types/datafetch";
import Messages from "./messages";

export const chatdata = createContext<any>(0);

export default function Chatscreen() {
  const [data, setData] = useState<Basicdata>();

  const [topnav, setTopnav] = useState(false);
  const { loading, error, profilepic, picfetch } = useProfilepicfetch();

  useEffect(() => {
    picfetch();
  }, []);
  useEffect(() => {
    const uid = getAuth().currentUser!.uid;
    getDoc(doc(getFirestore(), "users/" + uid)).then((result) => {
      setData(result.data() as Basicdata);
    });
  }, []);

  return (
    <chatdata.Provider value={[loading, error, profilepic, data]}>
      <div className="App bg-black">
        <Top
          setval={(tf) => {
            setTopnav(tf);
          }}
          alval={topnav}
        />

        <div className="flex max-h-screen w-screen justify-center sm:justify-between md:justify-between lg:justify-between xl:justify-between">
          <Sidepanel state={topnav} />
          <Messages />
        </div>
      </div>
    </chatdata.Provider>
  );
}
