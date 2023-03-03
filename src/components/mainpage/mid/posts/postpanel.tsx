import Posts from "./posts";
import { ColorRing } from "react-loader-spinner";
import { useUniversalfetch } from "../../../functions/datafetchfire";
import { InfiScroll } from "../../datadisplayfuncs/infi-scroll";

export default function Postpanel(props: any) {
  const {
    data,
    error,
    loading,
    fetch: fetchdatacondition,
  } = useUniversalfetch("GLOBAL_POSTS");

  return (
    <div className="List w-full h-full mt-6 mb-2 space-y-3 rounded-lg">
      <InfiScroll
        last={error}
        loadMore={() => {
          fetchdatacondition();
        }}
        loading={loading}
      >
        {data!.map((e: any, key: number) => {
          return <Posts item={e} key={key} />;
        })}
        {loading && (
          <div className="w-full h-full flex justify-center" key={0}>
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
      </InfiScroll>
    </div>
  );
}
