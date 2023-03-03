import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { menuContext } from "../mainpage/left panel/leftpanel";
import { Basicdata, Filetype } from "../types/datafetch";
import Preview from "./preview";

const contextData = createContext<any>(0);
function Createpostscreen() {
  const [newpostscreen, setNewpostscreen] = useContext(menuContext);
  const [popup, setPopup] = useState(newpostscreen);
  const [post, setPost] = useState<string | null>(null);
  const [postjsondata, setPostjsondata] = useState<Filetype | null>(null);
  const [coverimagejsondata, setCoverimagejsondata] = useState<Filetype | null>(
    null
  );
  const [previewscreen, setPreviewscreen] = useState(false);
  const [videosound, setVideosound] = useState(true);
  const [coverimage, setCoverimage] = useState();
  const [caption, setCaption] = useState<string>("");
  const [tagpeople, setTagpeople] = useState<string>("");
  const [data, setData] = useState<Basicdata>();

  useEffect(() => {
    const uid = getAuth().currentUser!.uid;
    getDoc(doc(getFirestore(), "users/" + uid)).then((result) => {
      setData(result.data() as Basicdata);
    });
  }, []);

  function imgupload(event: any) {
    setPost(URL.createObjectURL(event.target.files[0]));
    setPostjsondata(event.target.files[0]);
  }
  return (
    <contextData.Provider
      value={{
        image: [post, setPost],
        pop: [popup, setPopup],
        imgjson: [postjsondata, setPostjsondata],
        preview: [previewscreen, setPreviewscreen],
        videom: [videosound, setVideosound],
        cover: [coverimage, setCoverimage],
        capt: [caption, setCaption],
        tag: [tagpeople, setTagpeople],
        coverimgjson: [coverimagejsondata, setCoverimagejsondata],
        basicuserdata: data,
      }}
    >
      <div
        className={`absolute flex w-full h-full top-0 justify-center z-20 items-center backdrop-blur bg-slate-500 opacity-[0.99] border-2 border-black ${
          newpostscreen ? "block" : "hidden"
        }`}
      >
        <div tabIndex={-1} className={`absolute flex  z-20 `}>
          <div className="">
            <div className="relative h-80 bg-slate-400 rounded-lg shadow z-20 dark:bg-gray-700">
              <button
                type="button"
                onClick={() => {
                  setPopup(!popup);
                  setPost(null);
                  setNewpostscreen(!newpostscreen);
                }}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-900 dark:hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full space-y-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-900 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
              >
                <div className="flex flex-col items-center justify-center w-96 pt-5 pb-6">
                  {post == null ? (
                    <></>
                  ) : (
                    <span className="text-xl text-gray-500 mb-5 dark:text-gray-400">
                      UPLOADED!
                    </span>
                  )}
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={imgupload}
                />
                {post == null ? (
                  <div></div>
                ) : (
                  <button
                    onClick={() => {
                      setPreviewscreen(true);
                    }}
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 hover:text-gray-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Continue
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>
        <div
          className={`absolute ${
            previewscreen ? "block" : "hidden"
          } w-full h-full`}
        >
          <Preview />
        </div>
      </div>
    </contextData.Provider>
  );
}

export { contextData, Createpostscreen };
