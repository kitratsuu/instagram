import { useContext, useState } from "react";
import { contextData } from "./createpostscreen";

export default function Extradata() {
  const { imgjson, videom, cover, capt, tag, coverimgjson } =
    useContext(contextData);
  const [videosound, setVideosound] = videom;
  const [postjsondata] = imgjson;
  const [coverimage, setCoverimage] = cover;
  const [caption, setCaption] = capt;
  const [tagpeople, setTagpeople] = tag;
  const [coverimagejsondata, setCoverimagejsondata] = coverimgjson;

  return (
    <div
      className={`w-[400px]  h-fit bg-slate-900 flex flex-col border-2 border-white justify-center items-center rounded-lg space-y-4`}
    >
      <div
        className={`flex h-fit w-11/12 justify-between items-center mt-2 ${
          postjsondata.type.slice(0, 5) === "image" ? "hidden" : ""
        }`}
      >
        <div className={`flex flex-col items-center`}>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload Cover Photo
          </label>
          <input
            className="block w-[70px] text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="image/*"
            onChange={(event: any) => {
              setCoverimage(URL.createObjectURL(event.target.files[0]));
              setCoverimagejsondata(event.target.files[0]);
            }}
          />
        </div>
        <div className="w-[200px] h-[200px] rounded-lg border-2 border-white">
          {coverimage !== null ? (
            <img className="w-full h-full" src={coverimage} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-11/12">
        <textarea
          placeholder="Caption"
          id="large-input"
          className="bg-slate-900 w-full rounded-md text-white placeholder:text-lg"
          rows={4}
          cols={40}
          value={caption}
          onChange={(event) => {
            setCaption(event.target.value);
          }}
          name="description"
        />
      </div>
      <div className="w-11/12">
        <textarea
          placeholder="Tag-people"
          id="large-input"
          className="bg-slate-900 w-full rounded-md text-white placeholder:text-lg"
          rows={1}
          cols={40}
          value={tagpeople}
          onChange={(event) => {
            setTagpeople(event.target.value);
          }}
          name="description"
        />
      </div>

      <div
        className={`flex items-center mb-2 space-x-3 ${
          postjsondata.type.slice(0, 5) === "image" ? "hidden" : ""
        }`}
      >
        <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">
          Sound
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            onClick={() => {
              setVideosound(!videosound);
            }}
            type="checkbox"
            className="sr-only peer"
            checked={videosound}
            onChange={() => {}}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className=""></div>
    </div>
  );
}
