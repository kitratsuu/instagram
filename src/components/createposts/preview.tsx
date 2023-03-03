import React, { useContext, useState } from "react";
import Loading from "../extracomponents/loading";
import { useUploaduserdata } from "../functions/datafunctions";
import { menuContext } from "../mainpage/left panel/leftpanel";
import { contextData } from "./createpostscreen";
import Extradata from "./extradata";

export default function Preview() {
  const [newpostscreen, setNewpostscreen] = useContext(menuContext);
  const {
    image,
    pop,
    imgjson,
    preview,
    videom,
    capt,
    tag,
    basicuserdata,
    coverimgjson,
  } = useContext(contextData);
  const [popup, setPopup] = pop;
  const [post, setPost] = image;
  const [postjsondata] = imgjson;
  const [previewscreen, setPreviewscreen] = preview;
  const data = basicuserdata;
  const [videosound] = videom;
  const [extrapreviewdata1, setExtrapreviewdata1] = useState(false);
  const [caption] = capt;
  const [coverimagejsondata] = coverimgjson;
  const [tagpeople] = tag;
  const { dataloading, dataerror, datapercentage, upload } =
    useUploaduserdata();

  function handleuploadpost() {
    const obj = {
      json: postjsondata,
      videosound: videosound,
      cap: caption,
      tagp: tagpeople,
      coverimg: coverimagejsondata,
      userName: data?.userName,
    };
    upload(obj);
    console.log(obj);
  }
  return (
    <div
      className={`absolute w-full h-full overflow-auto bg-slate-800 justify-center items-center opacity-[0.98] z-20`}
    >
      <div className="w-full my-auto">
        <button
          type="button"
          onClick={() => {
            setPopup(!popup);
            setPost(null);
            setPreviewscreen(!previewscreen);
            setNewpostscreen(!newpostscreen);
          }}
          className="absolute top-3 right-2.5 z-30 text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-900 dark:hover:text-white"
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
        <div className="flex flex-col items-center mt-2 space-y-4">
          <div className="flex">
            <div className="w-[400px] h-fit max-h-[400px] bg-slate-900 flex flex-col justify-center items-center rounded-lg">
              {previewscreen ? (
                postjsondata !== null ? (
                  postjsondata.type.slice(0, 5) === "image" ? (
                    <img
                      className="w-[400px] max-h[400px] rounded-lg border-2 border-slate-200"
                      src={post}
                      alt=""
                    />
                  ) : (
                    <video
                      src={post}
                      muted={!videosound ? true : false}
                      className="w-[400px] h-[400px] rounded-lg border-2 border-slate-200"
                      autoPlay={true}
                      loop={true}
                    ></video>
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="">{extrapreviewdata1 ? <Extradata /> : ""}</div>
          <div className="text-white font-bold text-xl">
            {dataloading ? <Loading /> : ""}
            {datapercentage == 100 ? "Uploaded" : ""}
            {dataerror}
          </div>
          <button
            onClick={() => {
              setExtrapreviewdata1(true);
            }}
            className={`text-white ${
              extrapreviewdata1 ? "hidden" : ""
            } mb-2 w-fit bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:text-gray-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
          >
            continue
          </button>
          <button
            onClick={handleuploadpost}
            className={`text-white ${
              extrapreviewdata1 ? "" : "hidden"
            } mb-2 w-fit bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:text-gray-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
