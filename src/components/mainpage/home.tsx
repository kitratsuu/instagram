import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Rightpanel from "./rightpanel/rightpanel";
import Mid from "./mid/mid";
import Top from "./topnav/top";
import { Sidepanel } from "./left panel/leftpanel";
import { useProfilepicfetch } from "../profile/profilefunctions/profilefunctions";
import { Basicdata } from "../types/datafetch";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export const pfp = createContext<any>(0);

export default function Home() {
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
    <pfp.Provider value={[loading, error, profilepic, data]}>
      <div className="App bg-black">
        <Top
          setval={(tf) => {
            setTopnav(tf);
          }}
          alval={topnav}
        />

        <div className="flex max-h-screen w-screen justify-center sm:justify-between md:justify-between lg:justify-between xl:justify-between">
          <Sidepanel state={topnav} />
          <Mid />
          <Rightpanel />
        </div>
      </div>
    </pfp.Provider>
  );
}
