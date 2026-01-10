'use client'

import type { SVGProps } from "react";
const SvgMenuLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z" />
  </svg>
);
export default SvgMenuLine;
