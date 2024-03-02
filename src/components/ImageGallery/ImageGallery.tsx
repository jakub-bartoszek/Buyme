import { XMarkIcon } from "@heroicons/react/24/outline";
import { Product } from "../../App";
import "./ImageGallery.scss";

const ImageGallery = ({
 product,
 activeImageIndex,
 setActiveImageIndex,
 setShowGallery
}: {
 product: Product;
 activeImageIndex: number;
 setActiveImageIndex: React.Dispatch<React.SetStateAction<number | null>>;
 setShowGallery: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 const handleImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
  setActiveImageIndex(index);
  if (e.currentTarget !== null) {
   e.currentTarget.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
   });
  }
 };

 return (
  <div className="product-fullscreen-gallery">
   <div className="product-fullscreen-gallery__main-image-wrapper">
    <div className="product-fullscreen-gallery__main-image">
     {product.images && <img src={product.images[activeImageIndex]} />}
     <button
      className="product-fullscreen-gallery__close-button"
      onClick={() => setShowGallery(false)}
     >
      <XMarkIcon />
     </button>
    </div>
   </div>
   <div className="product-fullscreen-gallery__small-images-wrapper">
    {product.images?.map((image, index) => (
     <div
      key={index}
      className={`product-fullscreen-gallery__small-image ${
       activeImageIndex === index ? "active" : ""
      }`}
     >
      <img
       src={image}
       onClick={(e) => handleImageClick(e, index)}
      />
     </div>
    ))}
   </div>
  </div>
 );
};

export default ImageGallery;
