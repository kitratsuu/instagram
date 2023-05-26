import React, { useEffect } from "react";
import { useFetchreelsfromstorage } from "../../../functions/datafetchfire";

export default function Reel(props: { item: any }) {
  const {
    error,
    loading,
    fetchedreelurl,
    fetchedreelcoverpic,
    fetchpostfromstore,
  } = useFetchreelsfromstorage();
  useEffect(() => {
    fetchpostfromstore(props.item.folderuid, props.item.uid);
  }, []);
  return (
    <div className="w-full h-[510px] hover:opacity-50">
      <div className="w-11/12 h-[470px] border-2 border-white flex justify-center items-center">
        <img className="w-full h-full" src={fetchedreelcoverpic} />
      </div>
    </div>
  );
}
