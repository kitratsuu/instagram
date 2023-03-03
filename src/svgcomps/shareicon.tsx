import * as React from "react";
import { SVGProps } from "react";

const Shareicon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-label="Direct"
    color="#F5F5F5"
    fill="#F5F5F5"
    height={24}
    width={24}
    {...props}
  >
    <title>{"Direct"}</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 3 9.218 10.083M11.698 20.334 22 3.001H2l7.218 7.083 2.48 10.25z"
    />
  </svg>
);

export default Shareicon;
