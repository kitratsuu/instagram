import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { RefObject, useEffect, useState } from "react";
import uuid from "react-uuid";
import { Chats } from "../types/datafetch";
import { FirebaseError } from "firebase/app";

export function useFetchuserslist() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchedusers, setFetchedusers] = useState<{}[]>([]);

  async function postsFetch() {
    const docRef = query(collection(getFirestore(), "GLOBAL_USERS/"));
    getDocs(docRef).then((docSnap) => {
      setFetchedusers([...docSnap.docs.map((d) => d.data())]);
    });
  }
  return { error, loading, fetchedusers, postsFetch };
}

export function useFetchselecteduserslist() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchedusers, setFetchedusers] = useState<any[]>([]);

  async function selecteduserFetch(usern: string) {
    const docRef = query(
      collection(getFirestore(), "GLOBAL_USERS/"),
      where("userName", "==", usern)
    );
    await getDocs(docRef).then((docSnap) => {
      setFetchedusers([...docSnap.docs.map((d) => d.data())]);
    });
  }
  return { error, loading, fetchedusers, selecteduserFetch };
}

export function useSelectedFetchuserslist() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchedusers, setFetchedusers] = useState<{}[]>([]);

  async function postsFetch(list: []) {
    const docRef = query(
      collection(getFirestore(), "GLOBAL_USERS/"),
      where("userName", "==", list)
    );
    getDocs(docRef).then((docSnap) => {
      setFetchedusers([...docSnap.docs.map((d) => d.data())]);
    });
  }
  return { error, loading, fetchedusers, postsFetch };
}

export function useChatsfetch() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchedchats, setFetchedchats] = useState<{}[]>([]);

  async function chatsupload(chatuid: string, chat: Chats) {
    console.log("working");
    setDoc(doc(getFirestore(), `GLOBAL_CHATS/${chatuid}/chat/${uuid()}`), chat);
  }
  async function chatsFetch(chatuid: string) {
    const docRef = query(
      collection(getFirestore(), `GLOBAL_CHATS/${chatuid}/chat/`),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(docRef, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      setFetchedchats([...doc.docs.map((d) => d.data())]);
    });
  }
  return { error, loading, fetchedchats, chatsFetch, chatsupload };
}

export function useFetchprofilepics() {
  const storage = getStorage();
  const [photourl, setPhotourl] = useState<string | null>();
  async function picfetch(user_uid: string) {
    const storageref = ref(storage, `useruploads/${user_uid}/profile`);
    getDownloadURL(storageref).then((imgurl) => {
      setPhotourl(imgurl);
    });
  }
  return { picfetch, photourl };
}

export function useCreatechat() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createChat(
    obj: { user1: string; user2: string },
    chat: Chats,
    user2_uid: string
  ) {
    const a = uuid();
    try {
      setDoc(doc(getFirestore(), `GLOBAL_CHATS/${a}/`), obj);
      setDoc(doc(getFirestore(), `GLOBAL_CHATS/${a}/chat/${uuid()}`), chat);
      setDoc(
        doc(
          getFirestore(),
          `users/${getAuth().currentUser?.uid}/CHATS/${uuid()}`
        ),
        { userName: obj.user2, chatuid: a }
      );
      setDoc(doc(getFirestore(), `users/${user2_uid}/CHATS/${uuid()}`), {
        userName: obj.user1,
        chatuid: a,
      });
    } catch (error) {
      setError(error as any);
    }
  }

  return { error, loading, createChat };
}

export function useFetchchatterlist() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchedchatters, setFetchedchatters] = useState<{}[]>([]);
  async function chattersFetch() {
    const docRef = query(
      collection(getFirestore(), `users/${getAuth().currentUser?.uid}/CHATS`)
    );
    getDocs(docRef).then((docSnap) => {
      setFetchedchatters([...docSnap.docs.map((d) => d.data())]);
    });
  }
  return { error, loading, fetchedchatters, chattersFetch };
}

export function useElement(ref: RefObject<Element>, thhold = 0.7) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        // console.log(entry.isIntersecting);
      },
      { threshold: thhold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
}

// export function Documentlistner(){
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(false);

//   async function chatsFetch(chatuid: string) {
//     const docRef = query(
//       collection(getFirestore(), `GLOBAL_CHATS/${chatuid}/chat/`),
//       orderBy("timestamp", "asc")
//     );
//     getDocs(docRef).then((docSnap) => {
//       setFetchedchats([...docSnap.docs.map((d) => d.data())]);
//     });
//   }
// }
