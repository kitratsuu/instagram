import { AuthError, getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import uuid from "react-uuid";
import { Basicdata } from "../types/datafetch";

export function updateFields() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();
  async function updField(path: string, vals: {}) {
    setLoading(true);
    try {
      const set = await updateDoc(doc(getFirestore(), path), vals);
      client.invalidateQueries({
        queryKey: "basicdata",
      });
    } catch (error) {
      const e = error as AuthError;
      setError(e.message);
    }
    setLoading(false);
  }
  return { error, loading, updField };
}

export function useUploaduserdata() {
  const [dataloading, setDataLoading] = useState(false);
  const [dataerror, setDataError] = useState<string | null>();
  const [datapercentage, setDataPercentage] = useState(0);

  const auth = getAuth();
  const {
    loading: l2,
    error: e2,
    folderuid,
    uploadReelvideo,
    percentage: p2,
  } = uploadReel();
  const { loading, error, postuuid, uploadPostimg, percentage } = uploadPost();

  async function upload(obj: {
    json: any;
    videosound: boolean;
    cap: string;
    tagp: string;
    coverimg: any;
    userName: string;
  }) {
    setDataLoading(true);
    const typeofupload = obj.json.type.slice(0, 5);
    if (typeofupload === "video") {
      uploadReelvideo(obj.json, obj.coverimg);
      setDataLoading(l2);
      setDataError(e2);
      setDataPercentage(p2);

      await setDoc(
        doc(
          getFirestore(),
          `users/${auth.currentUser?.uid}/REELS/${folderuid}/`
        ),
        {
          folderuid: folderuid,
          videosound: obj.videosound,
          captionofreel: obj.cap,
          tagpeople: obj.tagp,
          likes: 0,
          commentscount: 0,
          timeofupload: Timestamp.fromDate(new Date()),
          userName: obj.userName,
          uid: auth.currentUser?.uid,
        }
      );
      await setDoc(doc(getFirestore(), `GLOBAL_REELS/${folderuid}`), {
        folderuid: folderuid,
        videosound: obj.videosound,
        captionofreel: obj.cap,
        tagpeople: obj.tagp,
        likes: 0,
        commentscount: 0,
        timeofupload: Timestamp.fromDate(new Date()),
        userName: obj.userName,
        uid: auth.currentUser?.uid,
      });
    } else {
      await uploadPostimg(obj.json);
      setDataLoading(loading);
      setDataError(error);
      setDataPercentage(percentage);

      await setDoc(
        doc(
          getFirestore(),
          `users/${auth.currentUser?.uid}/POSTS/${postuuid}/`
        ),
        {
          postuid: postuuid,
          captionofpost: obj.cap,
          tagpeople: obj.tagp,
          likes: 0,
          commentscount: 0,
          timeofupload: Timestamp.fromDate(new Date()),
          userName: obj.userName,
          uid: auth.currentUser?.uid,
        }
      );
      await setDoc(doc(getFirestore(), `GLOBAL_POSTS/${postuuid}`), {
        postuid: postuuid,
        captionofpost: obj.cap,
        tagpeople: obj.tagp,
        likes: 0,
        commentscount: 0,
        timeofupload: Timestamp.fromDate(new Date()),
        userName: obj.userName,
        uid: auth.currentUser?.uid,
      });
    }
    setDataLoading(false);
  }
  return { dataloading, dataerror, datapercentage, upload };
}

function uploadReel() {
  const storage = getStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [percentage, setPercentage] = useState(0);
  const { coverloading, covererror, coverupload, coverpercentage } =
    uploadCover();
  const folderuid = uuid();

  const auth = getAuth();
  async function uploadReelvideo(file: any, file2: any) {
    if (!file) {
      alert("please choose a file first");
    }
    const storageref = ref(
      storage,
      `useruploads/${auth.currentUser?.uid}/reels/${folderuid}/reelvideo`
    );

    const uploadTask = uploadBytesResumable(storageref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercentage(percent);
        percent < 100 ? setLoading(true) : setLoading(false);
      },
      (err) => {
        setError(String(err));
      },
      () => {
        coverupload(file2, folderuid);
        setLoading(coverloading);
        setPercentage(coverpercentage);
        setError(covererror);
      }
    );
  }
  return {
    loading,
    error,
    folderuid,
    uploadReelvideo,
    percentage,
  };
}

function uploadCover() {
  const storage = getStorage();
  const [coverloading, setLoading] = useState<boolean>(false);
  const [covererror, setError] = useState<string | null>();
  const [coverpercentage, setPercentage] = useState(0);

  const auth = getAuth();
  async function coverupload(file: any, folderuuid: string) {
    if (!file) {
      alert("please choose a file first");
    }
    const storageref = ref(
      storage,
      `useruploads/${auth.currentUser?.uid}/reels/${folderuuid}/coverpic`
    );

    const uploadTask = uploadBytesResumable(storageref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercentage(percent);
        percent < 100 ? setLoading(true) : setLoading(false);
      },
      (err) => {
        setError(String(err));
      }
    );
  }
  return { coverloading, covererror, coverupload, coverpercentage };
}

function uploadPost() {
  const storage = getStorage();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [percentage, setPercentage] = useState(0);
  const postuuid = uuid();
  const auth = getAuth();

  async function uploadPostimg(file: any) {
    if (!file) {
      alert("please choose a file first");
    }
    const storageref = ref(
      storage,
      `useruploads/${auth.currentUser?.uid}/posts/${postuuid}`
    );

    const uploadTask = uploadBytesResumable(storageref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercentage(percent);
        percent < 100 ? setLoading(true) : setLoading(false);
      },
      (err) => {
        setError(String(err));
      }
    );
  }
  return { loading, error, postuuid, uploadPostimg, percentage };
}
