import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState } from "react";

export function useFetchuserslist() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchedusers, setFetchedusers] = useState<{}[]>([]);
  const picfetch = useFetchprofilepics();

  async function postsFetch() {
    const docRef = query(collection(getFirestore(), "GLOBAL_USERS/"));
    getDocs(docRef).then((docSnap) => {
      setFetchedusers([...docSnap.docs.map((d) => d.data())]);
    });
    setFetchedusers(
      fetchedusers.map(async (e: any) => ({
        ...e,
        profilepicurl: await picfetch(e.uid),
      }))
    );
  }
  return { error, loading, fetchedusers, postsFetch };
}

export function useFetchprofilepics() {
  const storage = getStorage();
  async function picfetch(profile_uid: string) {
    const storageref = ref(storage, `useruploads/${profile_uid}/profile`);
    const url = await getDownloadURL(storageref);
    console.log(url);
    return url;
  }
  return picfetch;
}
