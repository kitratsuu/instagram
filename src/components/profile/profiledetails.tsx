import { createContext, useContext, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import {
  BsBookmark,
  BsCameraReelsFill,
  BsGrid3X3,
  BsPlusLg,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Story from "../mainpage/mid/stories/story";
import Posts from "./data/posts/posts";
import Reels from "./data/reels/reels";
import Saved from "./data/saved/saved";
import Tags from "./data/tags/tags";
import Pfpupdate from "./pfpupdate";
import { profile_pfp } from "./profile";

const profilecontextData = createContext<any>(0);

function Profiledetails() {
  const [loading, error, profilepic, data] = useContext(profile_pfp);
  const [headlines, setHeadlines] = useState<string[]>([
    "first",
    "second",
    "third",
    "fourth",
  ]);
  const [changeprofilepicscreen, setChangeprofilepicscreen] = useState(false);
  const [headlinebuttonstate, setHeadlinebuttonstate] = useState(false);
  const [buttonselection, setButtonselection] = useState<Number>(1);
  return (
    <profilecontextData.Provider
      value={[changeprofilepicscreen, setChangeprofilepicscreen]}
    >
      <div className="w-full space-y-8 overflow-auto">
        <div className={`${changeprofilepicscreen ? "block" : "hidden"}`}>
          <Pfpupdate />
        </div>
        <div className="sm:flex md:flex lg:flex mt-2">
          <div className="w-1/3 h-[300px] border-2 hidden sm:flex md:flex lg:flex justify-center items-center border-none">
            <button
              onClick={() => {
                setChangeprofilepicscreen(true);
              }}
              className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] rounded-full border-2 border-none"
            >
              <img
                src={profilepic}
                alt=""
                className="w-full h-full rounded-full"
              />
            </button>
          </div>
          <div className="h-[300px] sm:w-2/3 md:w-2/3 lg:w-2/3 w-full border-2 border-none">
            <div className="m-5 space-y-5">
              <div className="flex items-center sm:w-fit md:w-fit lg:w-fit w-full  space-x-5 ">
                <div className="w-[50px] h-[50px] sm:hidden md:hidden lg:hidden block rounded-full border-2 border-none"></div>

                <span className="text-white text-[30px]">{data?.userName}</span>
                <button className="bg-white sm:block md:block lg:block hidden h-fit p-1 rounded-lg hover:bg-white/50">
                  Edit profile
                </button>
                <AiTwotoneSetting color="white" size={25} />
              </div>
              <div className="flex text-white lg:space-x-20 md:space-x-10 sm:space-x-5 space-x-2 text-xl">
                <span className="">
                  <b>7</b> Posts
                </span>
                <span className="">
                  <b>5M</b> Followers
                </span>
                <span className="">
                  <b>20</b> Following
                </span>
              </div>
              <div className="">
                <span className="text-white text-xl font-bold">
                  {data?.fullName}
                </span>
              </div>
              <div className="max-w-[400px] w-full">
                <span className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit illum quasi officiis molestiae facere.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full ml-6 h-28 flex items-center border-2 border-none">
          <div className="flex overflow-y-auto space-x-4 sm:space-x-14 md:space-x-14 lg:space-x-14 ">
            {headlines.map((e, i) => {
              return <Story items={e} key={i} />;
            })}
          </div>
          <button
            onMouseOver={() => {
              setHeadlinebuttonstate(true);
            }}
            onMouseOut={() => {
              setHeadlinebuttonstate(false);
            }}
            className={`flex items-center justify-center w-[80px] h-[80px] m-2 rounded-full bg-slate-200 hover:bg-slate-400 border-slate-400 flex-none  border-2 border-none `}
          >
            <BsPlusLg
              className={` ${headlinebuttonstate ? "w-6 h-6" : "w-8 h-8"}`}
            />
          </button>
        </div>
        <div className="w-full h-fit flex justify-center">
          <div className="h-[1px] w-full bg-slate-400 mx-10 "></div>
        </div>
        <div className="flex text-slate-300 text-[17px] font-bold w-full justify-center space-x-4 sm:space-x-20 md:space-x-20 lg:space-x-20">
          <div className={`${buttonselection == 1 ? "pt-4" : ""}`}>
            <button
              onClick={() => {
                setButtonselection(1);
              }}
              className="flex items-center space-x-1"
            >
              <BsGrid3X3 size={12} />
              <span
                className={`${
                  buttonselection == 1 ? "text-white text-[15px]" : ""
                }`}
              >
                POSTS
              </span>
            </button>
          </div>
          <div className={`${buttonselection == 2 ? "pt-4" : ""}`}>
            <button
              onClick={() => {
                setButtonselection(2);
              }}
              className="flex items-center space-x-1"
            >
              <BsCameraReelsFill size={12} />
              <span
                className={`${
                  buttonselection == 2 ? "text-white text-[15px]" : ""
                }`}
              >
                REELS
              </span>
            </button>
          </div>
          <div className={`${buttonselection == 3 ? "pt-4" : ""}`}>
            <button
              onClick={() => {
                setButtonselection(3);
              }}
              className="flex items-center space-x-1"
            >
              <BsBookmark size={12} />
              <span
                className={`${
                  buttonselection == 3 ? "text-white text-[15px]" : ""
                }`}
              >
                SAVED
              </span>
            </button>
          </div>
          <div className={`${buttonselection == 4 ? "pt-4" : ""}`}>
            <button
              onClick={() => {
                setButtonselection(4);
              }}
              className="flex items-center space-x-1"
            >
              <CgProfile size={15} />
              <span
                className={`${
                  buttonselection == 4 ? "text-white text-[15px]" : ""
                }`}
              >
                TAGGED
              </span>
            </button>
          </div>
        </div>
        <div className=" ml-6">
          {buttonselection == 1 ? (
            <Posts />
          ) : buttonselection == 2 ? (
            <Reels />
          ) : buttonselection == 3 ? (
            <Saved />
          ) : (
            <Tags />
          )}
        </div>
      </div>
    </profilecontextData.Provider>
  );
}

export { profilecontextData, Profiledetails };
