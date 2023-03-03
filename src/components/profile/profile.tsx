import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Sidepanel } from "../mainpage/left panel/leftpanel";
import Top from "../mainpage/topnav/top";
import { Basicdata } from "../types/datafetch";
import { Profiledetails } from "./profiledetails";
import { useProfilepicfetch } from "./profilefunctions/profilefunctions";

export const profile_pfp = createContext<any>(0);

export default function Profile() {
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
    <profile_pfp.Provider value={[loading, error, profilepic, data]}>
      <div className="App bg-black">
        <Top
          setval={(tf) => {
            setTopnav(tf);
          }}
          alval={topnav}
        />
        <div className="flex max-h-screen w-screen  justify-between ">
          <Sidepanel state={topnav} />
          <Profiledetails />
        </div>
      </div>
    </profile_pfp.Provider>
  );
}
