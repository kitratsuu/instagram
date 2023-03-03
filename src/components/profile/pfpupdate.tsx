import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Loading from "../extracomponents/loading";
import { Filetype } from "../types/datafetch";
import { profilecontextData } from "./profiledetails";
import { useUploadProfilepic } from "./profilefunctions/profilefunctions";

export default function Pfpupdate() {
  const [changeprofilepicscreen, setChangeprofilepicscreen] =
    useContext(profilecontextData);
  const [profilepic, setProfilepic] = useState<string | null>(null);
  const [profilejsondata, setProfilejsondata] = useState<any>();
  const { picerror, percentage, picloading, handlepicUpload } =
    useUploadProfilepic();
  function pfpupload(event: any) {
    setProfilepic(URL.createObjectURL(event.target.files[0]));
    setProfilejsondata(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  return (
    <div className="absolute inset-0 w-screen h-screen z-20 flex flex-col justify-center items-center backdrop-blur bg-opacity-70 bg-black space-y-10">
      {profilepic === null ? (
        ""
      ) : (
        <div className="w-[140px] h-[140px] rounded-full border-2 border-white ">
          <img src={profilepic} alt="" className="w-full h-full rounded-full" />
        </div>
      )}
      <div className="w-[360px] h-[260px] border-2 border-white grid grid-rows-4 grid-flow-col rounded-2xl text-white bg-slate-700">
        <span className="w-full h-full flex justify-center items-center text-[30px]">
          Change Profile Picture
        </span>
        {profilepic === null ? (
          <label
            className="w-full h-full flex justify-center items-center border-slate-500 text-blue-400 text-xl font-medium border-t-2"
            htmlFor="pfp-file"
          >
            <span className="">Change Profile Pic</span>
            <input
              id="pfp-file"
              type="file"
              accept="image/*"
              className="block w-0 h-0"
              onChange={pfpupload}
            />
          </label>
        ) : (
          <button
            onClick={() => {
              handlepicUpload(profilejsondata);
            }}
            className="w-full h-fullflex justify-center items-center border-slate-500 text-blue-400 text-xl font-medium border-t-2 "
          >
            Upload
          </button>
        )}
        <button
          onClick={() => {
            handlepicUpload(null);
          }}
          className="w-full h-full flex justify-center items-center border-slate-500 border-t-2 text-red-500 text-xl font-medium"
        >
          Remove Current Photo
        </button>
        <button
          onClick={() => {
            setChangeprofilepicscreen(false);
          }}
          className="w-full h-full flex justify-center items-center border-slate-500 border-t-2 text-xl font-medium"
        >
          Close
        </button>
      </div>
      <div className="text-white text-lg">
        {percentage === 100 ? "Uploaded" : ""}
      </div>
      {picloading ? <Loading /> : ""}
    </div>
  );
}
