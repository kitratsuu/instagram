import { getAuth } from "firebase/auth";
import { Firestore, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { updateFields } from "../../../../functions/datafunctions";
import { Haveanaccount } from "../../signup";

const Birthday = () => {
  const date = new Date();
  const [value, setValue] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: date.toLocaleDateString(),
    endDate: date.toLocaleDateString(),
  });
  const navigate = useNavigate();

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  const { error, loading, updField } = updateFields();

  function setBirthDay() {
    const timestamp_date = Timestamp.fromDate(new Date());
    if (value.startDate === date.toLocaleDateString()) {
      alert("please select a date");
    } else {
      const auth = getAuth();
      const obj = {
        birthday: value.startDate,
        initSetup: true,
        timestamp: timestamp_date,
      };
      const path = "users/" + auth.currentUser?.uid;
      updField(path, obj);

      navigate("/");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col space-y-3 items-center justify-center bg-gray-200 ">
      <div className="w-[400px] h-[400px] border-2 border-slate-300 rounded-lg space-y-6 flex flex-col items-center">
        <div className="w-fit flex flex-col space-y-3 items-center">
          <FaBirthdayCake size={50} />
          <span className="text-2xl font-serif">Enter your Birthday</span>
        </div>
        <div className="w-[300px]">
          <Datepicker
            primaryColor={"blue"}
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <span>This wont be part of your public profile.</span>
        <div className="">{loading ? "Loading..." : ""}</div>
        <div className="">{error ? error : ""}</div>
        <button
          onClick={setBirthDay}
          type="button"
          className="text-white bg-[#1254e4] hover:bg-[#1254e4]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
        >
          Finish
        </button>
        <div />
      </div>
      <Haveanaccount />
    </div>
  );
};
export default Birthday;
