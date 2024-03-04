import Star from "./Star/Star";

interface RatingProps {
 rating: number;
 max?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, max = 5 }) => {
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

export default Rating;
