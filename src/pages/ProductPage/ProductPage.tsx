import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Rating from "../../components/Rating/Rating";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./styles.scss";
import { selectProducts } from "../../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../App";
import { addToCart } from "../../redux/cartSlice";
import { HeartIcon } from "@heroicons/react/24/solid";
import { addToFavourites, selectFavourites } from "../../redux/favouritesSlice";

const ProductPage: React.FC = () => {
 const { id } = useParams();
 const productId = parseInt(id || "0", 10); // Parse id as integer

 const products: Product[] = useSelector(selectProducts);
 const product = products.find((p) => p.id === productId);
 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
 const [activeFsGalleryImageIndex, setActiveFsGalleryImageIndex] = useState<
  number | null
 >(1);
 const [chosenSize, setChosenSize] = useState<string | null>(null);
 const [amount, setAmount] = useState<number>(0);
 const [showGallery, setShowGallery] = useState<boolean>(false);
 const favourites = useSelector(selectFavourites);
 const dispatch = useDispatch();

 useEffect(() => {
  if (product && product.images) {
   setActiveImageIndex(product.images.length > 0 ? 0 : null);
   setActiveFsGalleryImageIndex(product.images.length > 0 ? 0 : null);
  }
 }, [product]);

 const handleGalleryImageClick = (index: number) => {
  setActiveImageIndex(index);
 };

 const handleFsGalleryImageClick = (index: number) => {
  setActiveFsGalleryImageIndex(index);
 };

 const handleAddToCart = () => {
  if (chosenSize && amount > 0) {
   dispatch(addToCart({ id: product?.id || 0, size: chosenSize, amount }));
  }
 };

 if (!product) return <div>Error</div>;

 return (
  <main className="product">
   <div className="product-gallery">
    <div className="product-gallery__small-images">
     {product.images &&
      product.images.map((image, index) => (
       <div
        className={`product-gallery__small-image ${
         index === activeImageIndex && "active"
        }`}
        key={index}
       >
        <img
         src={image}
         onClick={() => handleGalleryImageClick(index)}
         alt={`Product Image ${index}`}
        />
       </div>
      ))}
    </div>
    {activeImageIndex !== null && product.images && (
     <div className="product-gallery__main-image-wrapper">
      <div
       className="product-gallery__main-image"
       onClick={() => setShowGallery(true)}
      >
       <img
        src={product.images[activeImageIndex]}
        alt="Main Product Image"
       />
      </div>
     </div>
    )}
   </div>
   {showGallery && product.images && (
    <div className="product-fullscreen-gallery">
     <div className="product-fullscreen-gallery__main-image-wrapper">
      <div className="product-fullscreen-gallery__main-image">
       {activeFsGalleryImageIndex !== null && (
        <>
         <img
          src={product.images[activeFsGalleryImageIndex]}
          alt="Fullscreen Product"
         />
         <div className="product-fullscreen-gallery__close-button">
          <XMarkIcon onClick={() => setShowGallery(false)} />
         </div>
        </>
       )}
      </div>
     </div>
     <div className="product-fullscreen-gallery__small-images">
      {product.images.map((image, index) => (
       <div
        className={`product-fullscreen-gallery__small-image ${
         index === activeFsGalleryImageIndex && "active"
        }`}
        key={index}
       >
        <img
         src={image}
         onClick={() => handleFsGalleryImageClick(index)}
         alt={`Small Product Image ${index}`}
        />
       </div>
      ))}
     </div>
    </div>
   )}
   <div className="product-info">
    <h2 className="product-info__name">{product.name}</h2>
    <div className="product-info__rating">
     <Rating rating={product.rating} />
    </div>
    <div className="product-info__price">{product.price} $</div>
    <div className="product-info__sizes">
     {product.available_sizes.map((size) => (
      <button
       key={size}
       className={`product-info__size ${size === chosenSize ? "chosen" : ""}`}
       onClick={() => setChosenSize(size)}
      >
       {size}
      </button>
     ))}
    </div>
    <div className="product-info__amount">
     <button
      disabled={amount === 0}
      className="product-info__amount--button"
      onClick={() => amount > 0 && setAmount((amount) => amount - 1)}
     >
      -
     </button>
     <div className="product-info__amount--number">{amount}</div>
     <button
      disabled={amount === 10}
      className="product-info__amount--button"
      onClick={() => amount < 10 && setAmount((amount) => amount + 1)}
     >
      +
     </button>
    </div>
    <div className="product-info__buttons">
     <button
      disabled={chosenSize == null || amount === 0}
      className="product-info__buy-button"
      onClick={handleAddToCart}
     >
      ADD TO CART
     </button>
     <button
      className="product-info__favourite-button"
      onClick={() => dispatch(addToFavourites({ id: product.id }))}
     >
      <HeartIcon
       className={`${
        favourites.findIndex((product) => product.id === productId) !== -1 &&
        "added"
       }`}
      />
     </button>
    </div>
   </div>
   <div className="product-description">{product.description}</div>
  </main>
 );
};

export default ProductPage;
