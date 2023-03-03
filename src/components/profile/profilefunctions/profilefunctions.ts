import { getAuth } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export function useProfilepicfetch() {
  const auth = getAuth();
  const storage = getStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [profilepic, setProfilepic] = useState<string | undefined>();
  async function picfetch() {
    setLoading(true);
    const storageref = ref(
      storage,
      `useruploads/${auth.currentUser?.uid}/profile`
    );
    getDownloadURL(storageref)
      .then((url) => {
        setProfilepic(url);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }
  return { loading, error, profilepic, picfetch };
}

export function useUploadProfilepic() {
  const auth = getAuth();
  const storage = getStorage();
  const [picloading, setLoading] = useState<boolean>(false);
  const [percentage, setPercentage] = useState(0);
  const [picerror, setError] = useState<string | null>();

  async function handlepicUpload(file: any) {
    if (file === null) {
      if (confirm("are you sure you want to delete your pfp?")) {
        setLoading(true);
        try {
          await deleteObject(
            ref(storage, `useruploads/${auth.currentUser?.uid}/profile`)
          );
        } catch (error) {}
        setLoading(false);
      }
    } else {
      const storageRef = ref(
        storage,
        `/useruploads/${auth.currentUser?.uid}/profile`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercentage(percent);
          percent < 100 ? setLoading(true) : setLoading(false);
        },
        (err) => setError(String(err)),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    }
  }
  return { picerror, percentage, picloading, handlepicUpload };
}
