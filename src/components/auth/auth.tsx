import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useBasicData } from "../functions/userfncs";

export default function Auth(props: {
  children: (isauth: boolean, setupstate: boolean) => React.ReactNode;
}) {
  const [user, setUser] = useState(getAuth().currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, basicdata } = useBasicData();
  const state = basicdata?.initSetup;

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        if (location.pathname == "/signup") {
        } else {
          navigate("/login");
        }
      } else {
        console.log(state);
        if (location.pathname == "") {
          navigate("/");
        } else {
          navigate(location.pathname);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [location.pathname, state]);

  return <div>{props.children(user !== null, state !== true)}</div>;
}
