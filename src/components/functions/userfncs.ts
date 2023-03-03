import {
  AuthError,
  deleteUser,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  where,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Basicdata } from "../types/datafetch";
import { useQuery, useQueryClient } from "react-query";
import uuid from "react-uuid";
import { ref } from "firebase/storage";
import Profile from "../../../public/profile.jpg";
import { useUploadProfilepic } from "../profile/profilefunctions/profilefunctions";

export function signUpNew() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { picerror, percentage, picloading, handlepicUpload } =
    useUploadProfilepic();
  async function newUser(signup: {
    email: string;
    fname: string;
    uname: string;
    pass: string;
  }) {
    setLoading(true);
    const querySnapshot = await getDocs(
      query(
        collection(getFirestore(), "users"),
        where("userName", "==", signup.uname)
      )
    );

    if (querySnapshot.docs.length == 0) {
      try {
        const signupstate = await createUserWithEmailAndPassword(
          getAuth(),
          signup.email,
          signup.pass
        );

        await setDoc(doc(getFirestore(), "users/" + signupstate.user.uid), {
          email: signup.email,
          fullName: signup.fname,
          userName: signup.uname,
          initSetup: false,
          uid: signupstate.user.uid,
        });
        await setDoc(
          doc(getFirestore(), "GLOBAL_USERS/" + signupstate.user.uid),
          {
            fullName: signup.fname,
            userName: signup.uname,
            uid: signupstate.user.uid,
          }
        );
        // handlepicUpload(Profile);
      } catch (error) {
        const e = error as AuthError;
        setError(e.message);
      }
    } else {
      setError("Username already exists.");
    }

    setLoading(false);
  }
  return { loading, error, newUser };
}

export function deleteCurrUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [error, setError] = useState<any>();
  async function delU() {
    console.log(user?.uid);

    try {
      const del = await deleteUser(user!);
      console.log(del);
    } catch (error) {
      const e = error as AuthError;
      console.log(e.message);
      setError(e);
    }
  }

  return { delU, error };
}

export function authStatus() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function signIn(signin: { email: string; pass: string }) {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(
        getAuth(),
        signin.email,
        signin.pass
      );
    } catch (error) {
      const e = error as AuthError;
      setError(e.message);
    }

    setLoading(false);
  }
  return { loading, error, signIn };
}

export function useBasicData() {
  const auth = getAuth();
  const data = useQuery(
    "basicdata",
    () => {
      return getDoc(doc(getFirestore(), "users/" + auth.currentUser?.uid)).then(
        (result) => {
          return result.data() as Basicdata;
        }
      );
    },
    {
      enabled: auth.currentUser !== null,
    }
  );

  return {
    error: data.error,
    loading: data.isLoading,
    basicdata: data.data,
  };
}
