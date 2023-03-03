import { useEffect } from "react";
import { useFetchpostsfromstorage } from "../../../functions/datafetchfire";

export default function Post(props: { item: any }) {
  const { error, loading, fetchedposturl, fetchpostfromstore } =
    useFetchpostsfromstorage();
  useEffect(() => {
    fetchpostfromstore(props.item.postuid);
  }, []);
  return (
    <div className="w-[400px] h-[400px]">
      <div className="w-11/12 h-[360px] border-2 border-white flex justify-center items-center">
        <img className="w-full h-full" src={fetchedposturl} />
      </div>
    </div>
  );
}
