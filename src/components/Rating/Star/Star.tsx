import { useId } from "react";

export const Star = ({ variant }: { variant: "filled" | "empty" | "half" }) => {
 const id = useId();

 let c1, c2;
 if (variant === "filled") {
  c1 = "#000000";
  c2 = "#000000";
 } else if (variant === "empty") {
  c1 = "#C4C4C4";
  c2 = "#C4C4C4";
 } else if (variant === "half") {
  c1 = "#000000";
  c2 = "#C4C4C4";
 }

 return (
  <svg
   width="20"
   height="19"
   viewBox="0 0 20 19"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
  >
   <defs>
    <linearGradient id={id}>
     <stop
      offset="50%"
      stopColor={c1}
     />
     <stop
      offset="50%"
      stopColor={c2}
     />
    </linearGradient>
   </defs>
   <path
    d="M10 0.148438L12.935 6.14144L19.5 7.10844L14.75 11.7704L15.871 18.3564L10 15.2454L4.129 18.3564L5.25 11.7704L0.5 7.10844L7.064 6.14144L10 0.148438Z"
    fill={`url(#${id})`}
   />
  </svg>
 );
};
