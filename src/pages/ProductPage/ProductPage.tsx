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
 // Extracting the 'id' parameter from the URL using React Router's 'useParams' hook
 const { id } = useParams();
 // Parsing the 'id' parameter to obtain the productId
 const productId = parseInt(id || "0", 10);
 // Retrieving products from the Redux store
 const products: Product[] = useSelector(selectProducts);
 // Finding the product with the specified productId
 const product = products.find((p) => p.id === productId);

 // State variables for managing various aspects of the component's behavior
 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
 const [activeFsGalleryImageIndex, setActiveFsGalleryImageIndex] = useState<
  number | null
 >(1);
 const [chosenSize, setChosenSize] = useState<string | null>(null);
 const [amount, setAmount] = useState<number>(0);
 const [showGallery, setShowGallery] = useState<boolean>(false);

 // Retrieving favourites from the Redux store
 const favourites = useSelector(selectFavourites);
 const dispatch = useDispatch();

 // Effect hook to set initial values for image indices when the product or its images change
 useEffect(() => {
  if (product && product.images) {
   setActiveImageIndex(product.images.length > 0 ? 0 : null);
   setActiveFsGalleryImageIndex(product.images.length > 0 ? 0 : null);
  }
 }, [product]);

 // Function to handle clicks on small gallery images
 const handleGalleryImageClick = (index: number) => {
  setActiveImageIndex(index);
 };

 // Function to handle clicks on fullscreen gallery images
 const handleFsGalleryImageClick = (index: number) => {
  setActiveFsGalleryImageIndex(index);
 };

 // Function to handle adding the product to the cart
 const handleAddToCart = () => {
  if (chosenSize && amount > 0) {
   dispatch(addToCart({ id: product?.id || 0, size: chosenSize, amount }));
  }
 };

 // If the product is not found, render an error message
 if (!product) {
  return <div>Error: Product not found</div>;
 }

 return (
  <main className="product">
   {/* Product Gallery */}
   <div className="product-gallery">
    {/* Small Images */}
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
    {/* Main Image */}
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
   {/* Fullscreen Gallery */}
   {showGallery && product.images && (
    <div className="product-fullscreen-gallery">
     {/* Main Image */}
     <div className="product-fullscreen-gallery__main-image-wrapper">
      <div className="product-fullscreen-gallery__main-image">
       {activeFsGalleryImageIndex !== null && (
        <>
         <img
          src={product.images[activeFsGalleryImageIndex]}
          alt="Fullscreen Product"
         />
         {/* Close Button */}
         <div className="product-fullscreen-gallery__close-button">
          <XMarkIcon onClick={() => setShowGallery(false)} />
         </div>
        </>
       )}
      </div>
     </div>
     {/* Small Images */}
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
   {/* Product Information */}
   <div className="product-info">
    {/* Product Name */}
    <h2 className="product-info__name">{product.name}</h2>
    {/* Product Rating */}
    <div className="product-info__rating">
     <Rating rating={product.rating} />
    </div>
    {/* Product Price */}
    <div className="product-info__price">{product.price} $</div>
    {/* Product Sizes */}
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
    {/* Product Amount */}
    <div className="product-info__amount">
     {/* Decrease Amount Button */}
     <button
      disabled={amount === 0}
      className="product-info__amount--button"
      onClick={() => amount > 0 && setAmount((amount) => amount - 1)}
     >
      <span>-</span>
     </button>
     {/* Amount Display */}
     <div className="product-info__amount--number">{amount}</div>
     {/* Increase Amount Button */}
     <button
      disabled={amount === 10}
      className="product-info__amount--button"
      onClick={() => amount < 10 && setAmount((amount) => amount + 1)}
     >
      <span>+</span>
     </button>
    </div>
    {/* Action Buttons */}
    <div className="product-info__buttons">
     {/* Add to Cart Button */}
     <button
      disabled={chosenSize == null || amount === 0}
      className="product-info__buy-button"
      onClick={handleAddToCart}
     >
      ADD TO CART
     </button>
     {/* Add to Favourites Button */}
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
   {/* Product Description */}
   <div className="product-description">{product.description}</div>
  </main>
 );
};

export default ProductPage;
