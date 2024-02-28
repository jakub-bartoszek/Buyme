import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Rating from "../../components/Rating/Rating";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./ProductPage.scss";
import { selectProducts } from "../../utils/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../App";
import { addToCart } from "../../utils/redux/cartSlice";
import { HeartIcon } from "@heroicons/react/24/solid";
import { addToFavourites, selectFavourites } from "../../utils/redux/favouritesSlice";
import AlertWindow from "../../components/AlertWindow/AlertWindow";

const ProductPage: React.FC = () => {
 const { id } = useParams();
 const productId = parseInt(id || "0", 10);
 const products: Product[] = useSelector(selectProducts);
 const product = products.find((p) => p.id === productId);
 const navigate = useNavigate();

 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
 const [activeFsGalleryImageIndex, setActiveFsGalleryImageIndex] = useState<number | null>(1);
 const [chosenSize, setChosenSize] = useState<string>("");
 const [amount, setAmount] = useState<number>(0);
 const [showGallery, setShowGallery] = useState<boolean>(false);
 const [showAlertWindow, setShowAlertWindow] = useState<boolean>(false);

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
   <div className="product__main-image">
    {product.images && product.images[0] && <img src={product.images[0]} />}
   </div>
   <div className="product__info">
    <div className="product__name-wrapper">
     <h2 className="product__name">{product.name}</h2>
     <div className="product__favourite-button">
      <HeartIcon />
     </div>
    </div>
    <p className="product__price">{product.price} $</p>
    <div className="product__sizes">
     {product.available_sizes.map((size) => (
      <button className="product__size">{size}</button>
     ))}
    </div>
    <div className="product__amount">
     <button className="product__amount-button">-</button>
     <input
      type="number"
      className="product__amount-number"
     />
     <button className="product__amount-button">+</button>
    </div>
    <button className="product__buy-button">ADD TO CART</button>
   </div>
   <div className="product__gallery">
    {product.images &&
     product.images.slice(1).map((image) => (
      <div className="product__gallery-image">
       <img src={image} />
      </div>
     ))}
   </div>
  </main>
 );
};

export default ProductPage;
