import { createContext, useEffect, useState } from "react";
import {
  BsInstagram,
  AiOutlineHome,
  AiOutlineSearch,
  MdExplore,
  BsMessenger,
  IoIosNotificationsOutline,
  AiOutlinePlusSquare,
  CgProfile,
  HiOutlineBars3,
  TfiVideoClapper,
} from "react-icons/all";
import { useLocation, useNavigate } from "react-router-dom";
import { Createpostscreen } from "../../createposts/createpostscreen";
import Menubar from "./menubar";

const menuContext = createContext<any>(0);

function Sidepanel(props: { state: boolean }) {
  const [menu, setMenu] = useState(false);
  const [newpostscreen, setNewpostscreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return (
    <menuContext.Provider value={[newpostscreen, setNewpostscreen]}>
      <div className="">
        <div
          className={` w-72 md:w-64 sm:w-fit sm:flex md:flex lg:flex sm:relative md:relative lg:relative rounded-lg absolute z-10 h-screen ${
            props.state ? "block" : "hidden"
          } overflow-hidden flex-row `}
        >
          <div className="py-8 md:px-3 w-52 md:w-64 sm:w-fit mt-2 mb-2 h-full bg-slate-400 rounded-lg dark:bg-gray-800">
            <div className="py-8">
              <a href="#" className="flex items-center pl-2.5 mb-10">
                <BsInstagram className="md:w-8  w-20 h-8 mx-2 fill-black" />
                <span className="self-center hidden  md:block text-xl font-semibold dark:text-white">
                  Instagram
                </span>
              </a>
            </div>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className={`flex items-center w-full p-2 text-base font-normal text-black rounded-lg dark:text-white hover:bg-gray-100 ${
                    location.pathname == "/home" ? "bg-gray-700" : ""
                  } dark:hover:bg-gray-700`}
                >
                  <AiOutlineHome className="w-6 h-6" />
                  <span className="ml-3">Home</span>
                </button>
              </li>
              <li>
                <button
                  disabled={true}
                  className="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white"
                >
                  <AiOutlineSearch className="w-6 h-6" />
                  <span className="ml-3 text-gray-400">Search</span>
                </button>
              </li>
              <li>
                <button
                  disabled={true}
                  className="flex items-center w-full p-2 text-base font-normal text-blaack rounded-lg dark:text-white"
                >
                  <MdExplore className="w-6 h-6" />
                  <span className="ml-3 text-gray-400">Explore</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/reels");
                  }}
                  className={`flex items-center w-full  p-2 text-base font-normal text-black rounded-lg dark:text-white hover:bg-gray-100 ${
                    location.pathname == "/reels" ? "bg-gray-700" : ""
                  } dark:hover:bg-gray-700`}
                >
                  <TfiVideoClapper className="w-6 h-6 fill-white" />
                  <span className="ml-3">Reels</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/messages");
                  }}
                  className={`flex items-center w-full p-2 text-base font-normal text-black rounded-lg dark:text-white hover:bg-gray-100 ${
                    location.pathname == "/messages" ? "bg-gray-700" : ""
                  } dark:hover:bg-gray-700`}
                >
                  <BsMessenger className="w-6 h-6" />
                  <span className=" ml-3">Messages</span>
                </button>
              </li>
              <li>
                <button className="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white">
                  <IoIosNotificationsOutline className="w-6 h-6 fill-white" />
                  <span className="ml-3 text-gray-400">Notifications</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setNewpostscreen(!newpostscreen);
                  }}
                  className={`flex w-full p-2 text-base font-normal text-black rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <AiOutlinePlusSquare className="w-6 h-6 fill-white" />
                  <span className="ml-3 whitespace-nowrap">Create</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className={`flex w-full p-2 text-base font-normal text-black rounded-lg dark:text-white hover:bg-gray-100 ${
                    location.pathname == "/profile" ? "bg-gray-700" : ""
                  } dark:hover:bg-gray-700`}
                >
                  <CgProfile className="w-6 h-6 fill-white" />
                  <span className="ml-3 whitespace-nowrap">Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenu(!menu);
                  }}
                  className={`flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <HiOutlineBars3 className="w-6 h-6 fill-white" />
                  <span className="flex-1 ml-3 text-left text-white whitespace-nowrap">
                    More
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Createpostscreen />
        <Menubar show={menu} />
      </div>
    </menuContext.Provider>
  );
}

export { menuContext, Sidepanel };
