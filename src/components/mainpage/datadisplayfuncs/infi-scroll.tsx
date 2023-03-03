import { useEffect, useRef } from "react";
import Loading from "../../extracomponents/loading";

export function InfiScroll(props: {
  children?: React.ReactNode;
  loading?: boolean;
  last?: boolean;
  loadMore?: Function;
}) {
  const { ref } = useInfiScroll(props.loadMore, props.loading);

  return (
    <>
      {props.children}
      {!props.last && (
        <div className="w-full" ref={ref}>
          <Loading />
        </div>
      )}
    </>
  );
}

export function useInfiScroll(loadMore?: Function, loading?: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!loading) {
          loadMore?.();
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current!);
      }
    };
  }, [loadMore, loading]);

  return {
    ref,
  };
}
