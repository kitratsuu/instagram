import React, { useEffect, useState } from "react";

export default function Input(props: {
  type: string;
  place: string;
  name: string;
  val: (str1: string, str2: string) => void;
}) {
  const [val, setVal] = useState<string>("");

  useEffect(() => {
    props.val(props.name, val);
  }, [val]);

  return (
    <div className="relative">
      <input
        type={props.type}
        id="floating_filled"
        name={props.name}
        placeholder=" "
        autoComplete="off"
        value={val}
        onFocus={(e) => {
          setVal(e.target.value);
        }}
        onChange={(e) => {
          setVal(e.target.value);
        }}
        className="focus:placeholder:text-sm px-3 border-2 border-slate-300 rounded-sm w-full z-20 h-10 peer"
      />
      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
        {props.place}
      </label>
    </div>
  );
}
