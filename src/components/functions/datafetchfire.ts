import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState } from "react";

export function useFetchpost() {
  const auth = getAuth();
  async function fetchpostdata() {
    try {
      const docRef = doc(
        getFirestore(),
        `users/${auth.currentUser?.uid}/posts/70bff8a4-496a-b0ee-a43e-9bc7e142cc60`
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {}
  }
  return fetchpostdata;
}

export function useFetchpostscount() {
  const [error, setError] = useState();
  const [docCount, setDocCount] = useState<any>();
  const auth = getAuth();
  async function postscount(collec: string) {
    try {
      const docRef = collection(
        getFirestore(),
        `users/${auth.currentUser?.uid}/${collec}`
      );
      const snapShot = await getCountFromServer(docRef);
      setDocCount(snapShot.data().count);
    } catch (error: any) {
      setError(error);
    }
  }
  return { error, docCount, postscount };
}

export function useUniversalfetch(category: string) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [lastindex, setLastindex] = useState<{}>();
  const auth = getAuth();

  function useInitialpostsfetch() {
    const docRef = query(
      collection(getFirestore(), `${category}`),
      orderBy("timeofupload", "desc"),
      limit(3)
    );
    getDocs(docRef)
      .then((docSnap) => {
        setData(docSnap.docs.map((d) => d.data()) as any[]);
        setLastindex(docSnap.docs[docSnap.docs.length - 1]);
      })
      .catch((error) => {
        alert("cannot fetch data due to some error");
      });
  }

  function fetchmoredata() {
    try {
      const docRef = query(
        collection(getFirestore(), `${category}`),
        orderBy("timeofupload", "desc"),
        startAfter(lastindex),
        limit(2)
      );
      getDocs(docRef)
        .then((docSnap) => {
          setData([...data, ...docSnap.docs.map((d) => d.data())]);
          setLastindex(docSnap.docs[docSnap.docs.length - 1]);
        })
        .catch((error) => {
          // alert("cannot fetch data due to some error");
        });
    } catch (error) {
      setError(true);
    }
  }

  function fetchdatacondition() {
    if (data.length <= 0) {
      useInitialpostsfetch();
    } else {
      fetchmoredata();
    }
  }
  return {
    data,
    error,
    loading,
    fetch: fetchdatacondition,
  };
}

export function useFetchpostsfromstorage() {
  const [error, setError] = useState();
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [fetchedposturl, setFetchedposturl] = useState("");
  function fetchpostfromstore(postuuid: string, uid: string) {
    setLoading(true);
    const storageref = ref(storage, `useruploads/${uid}/posts/${postuuid}`);
    getDownloadURL(storageref)
      .then((url) => {
        setFetchedposturl(url);
      })
      .catch((err) => {
        setError(err);
      });
    setLoading(false);
  }
  return { error, loading, fetchedposturl, fetchpostfromstore };
}

export function useFetchreelsfromstorage() {
  const [error, setError] = useState();
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [fetchedreelurl, setFetchedreelurl] = useState("");
  const [fetchedreelcoverpic, setFetchedreelcoverpic] = useState("");
  const auth = getAuth();
  function fetchpostfromstore(folderuuid: string, useruid: string) {
    setLoading(true);
    const reelstorageref = ref(
      storage,
      `useruploads/${useruid}/reels/${folderuuid}/reelvideo`
    );
    getDownloadURL(reelstorageref)
      .then((url) => {
        setFetchedreelurl(url);
      })
      .catch((err) => {
        setError(err);
      });
    const coverstorageref = ref(
      storage,
      `useruploads/${useruid}/reels/${folderuuid}/coverpic`
    );
    getDownloadURL(coverstorageref)
      .then((url) => {
        setFetchedreelcoverpic(url);
      })
      .catch((err) => {
        setError(err);
      });

    setLoading(false);
  }
  return {
    error,
    loading,
    fetchedreelurl,
    fetchedreelcoverpic,
    fetchpostfromstore,
  };
}
