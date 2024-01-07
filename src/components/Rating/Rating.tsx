import { Star } from "./Star/Star";

export const Rating = ({
 rating,
 max = 5
}: {
 rating: number;
 max?: number;
}) => {
 return (
  <div className="flex items-center bg-white">
   {Array.from({ length: Math.floor(rating) }, (_, i) => (
    <Star
     key={i}
     variant="filled"
    />
   ))}
   {!Number.isInteger(rating) && <Star variant="half" />}
   {Array.from({ length: max - Math.ceil(rating) }, (_, i) => (
    <Star
     key={i}
     variant="empty"
    />
   ))}
  </div>
 );
};
