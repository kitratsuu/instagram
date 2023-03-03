import React from "react";
import { BsInstagram } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";

export default function Top(props: {
  setval: (val: boolean) => void;
  alval: boolean;
}) {
  return (
    <div className="flex sm:hidden md:hidden lg:hidden">
      <div className=" h-fit w-fit">
        <button
          onClick={() => {
            props.setval(!props.alval);
          }}
        >
          <GoThreeBars size="30" fill="white" />
        </button>
      </div>
      <div className="w-full flex justify-center">
        <a href="#" className="flex items-center pl-2.5 ">
          <BsInstagram className="w-8 h-fit mx-2 fill-white" />
          <span className="self-center md:block text-xl text-white font-semibold ">
            Instagram
          </span>
        </a>
      </div>
    </div>
  );
}
