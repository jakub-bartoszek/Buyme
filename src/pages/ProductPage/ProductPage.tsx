import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Rating from "../../components/Rating/Rating";
import "./ProductPage.scss";
import { selectProducts } from "../../utils/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../App";
import { addToCart } from "../../utils/redux/cartSlice";
import { HeartIcon } from "@heroicons/react/24/solid";
import { addToFavourites, selectFavourites } from "../../utils/redux/favouritesSlice";
import AlertWindow from "../../components/AlertWindow/AlertWindow";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

const ProductPage: React.FC = () => {
 const { id } = useParams();
 const productId = parseInt(id || "0", 10);
 const products: Product[] = useSelector(selectProducts);
 const product = products.find((p) => p.id === productId);
 const navigate = useNavigate();

 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(1);
 const [chosenSize, setChosenSize] = useState<string>("");
 const [amount, setAmount] = useState<number>(0);
 const [showGallery, setShowGallery] = useState<boolean>(false);
 const [showAlertWindow, setShowAlertWindow] = useState<boolean>(false);

 const favourites = useSelector(selectFavourites);
 const dispatch = useDispatch();

 useEffect(() => {
  if (product && product.images) {
   setActiveImageIndex(product.images.length > 0 ? 0 : null);
  }
 }, [product]);

 useEffect(() => {
  console.log("scroll");
  window.scrollTo({
   top: 0
  });
 }, []);

 const handleGalleryImageClick = (index: number) => {
  setShowGallery(true);
  setActiveImageIndex(index);
 };

 const handleAmountIncrease = () => {
  if (amount < 20) {
   setAmount((amount) => amount + 1);
  }
 };

 const handleAmountDecrease = () => {
  if (amount > 0) {
   setAmount((amount) => amount - 1);
  }
 };

 const handleAddToCart = () => {
  if (chosenSize && amount > 0) {
   dispatch(addToCart({ id: product?.id || 0, size: chosenSize, amount }));

   setShowAlertWindow(true);
  }
 };

 const onAlertConfirm = () => {
  navigate("/cart");
  setShowAlertWindow(false);
 };

 const onAlertCancel = () => {
  setShowAlertWindow(false);
 };

 if (!product) {
  return <div>Error: Product not found</div>;
 }

 return (
  <main className="product">
   {showAlertWindow && (
    <AlertWindow
     title="You added this product to cart"
     confirmFunction={onAlertConfirm}
     cancelFunction={onAlertCancel}
     confirmText="Go to cart"
     cancelText="Continue shopping"
     product={product}
     chosenSize={chosenSize}
     amount={amount}
    />
   )}
   {showGallery && product.images && (
    <ImageGallery
     product={product}
     activeImageIndex={activeImageIndex || 0}
     setActiveImageIndex={setActiveImageIndex}
     setShowGallery={setShowGallery}
    />
   )}
   <div className="product__main-image">
    {product.images && product.images[0] && (
     <img
      src={product.images[0]}
      onClick={() => handleGalleryImageClick(0)}
     />
    )}
   </div>
   <div className="product__info">
    <div>
     <div className="product__name-wrapper">
      <h2 className="product__name">{product.name}</h2>
      <button
       className={`product__favourite-button `}
       onClick={() => dispatch(addToFavourites({ id: product.id }))}
      >
       <HeartIcon
        className={`${
         favourites.findIndex((product) => product.id === productId) !== -1 && "added"
        }`}
       />
      </button>
     </div>
     <p className="product__price">{product.price} $</p>
     <Rating rating={product.rating} />
    </div>
    <div className="product__sizes">
     <span>Sizes</span>
     {product.available_sizes.map((size) => (
      <button
       key={size}
       className={`product__size ${size === chosenSize && "chosen"}`}
       onClick={() => setChosenSize(size)}
      >
       {size}
      </button>
     ))}
    </div>
    <div className="product__amount">
     <span>Amount</span>
     <button
      className="product__amount-button"
      onClick={handleAmountDecrease}
     >
      -
     </button>
     <div className="product__amount-number">{amount}</div>
     <button
      className="product__amount-button"
      onClick={handleAmountIncrease}
     >
      +
     </button>
    </div>
    <button
     className="product__buy-button"
     onClick={handleAddToCart}
    >
     <ShoppingBagIcon />
     <span>Add to cart</span>
    </button>
   </div>
   <div className="product__gallery">
    {product.images &&
     product.images.slice(1).map((image, index) => (
      <div
       key={index}
       className="product__gallery-image"
      >
       <img
        src={image}
        onClick={() => handleGalleryImageClick(index + 1)}
       />
      </div>
     ))}
   </div>
  </main>
 );
};

export default ProductPage;
