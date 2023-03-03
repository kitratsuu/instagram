import React, { useState } from "react";

export default function Profilepic(props: {
  state: boolean;
  setstate: (st: boolean) => void;
}) {
  const [popup, setPopup] = useState(props.state);
  const [img, setImg] = useState<string>();

  function imgupload(event: any) {
    setImg(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
  }
  function servupload() {}
  return (
    <div
      className={`absolute flex w-full h-full top-0 justify-center z-20 items-center backdrop-blur bg-slate-500 opacity-80 border-2 border-black ${
        props.state ? "block" : "hidden"
      }`}
    >
      <div id="popup-modal" tabIndex={-1} className={`absolute flex  z-50 `}>
        <div className=" max-w-md md:h-auto">
          <div className="relative bg-slate-400 rounded-lg shadow z-30 dark:bg-gray-700">
            <button
              type="button"
              onClick={() => {
                setPopup(!popup);
                props.setstate(false);
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
              className="flex flex-col items-center justify-center w-full h-fit space-y-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-900 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
            >
              <div className="flex flex-col items-center justify-center w-96 pt-5 pb-6">
                <div className="w-fit h-fit mb-3 border-2 border-slate-400 text-gray-400">
                  <img
                    className="w-28 h-28 flex border-2 m-2 border-slate-400 justify-center items-center rounded-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={imgupload}
              />
              <button
                onClick={servupload}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 hover:text-gray-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Upload
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                No, cancel
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
