import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../App";
import "./styles.scss";
import { changeAmount, removeItem, selectCart } from "../../redux/cartSlice";
import { selectProducts } from "../../redux/productsSlice";
import { useNavigate } from "react-router";
import CartTile from "../../components/CartTile/CartTile";
import AlertWindow from "../../components/AlertWindow/AlertWindow";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export interface CartItem {
 id: number;
 sizes: { name: string; amount: number }[];
}

const Cart: React.FC = () => {
 const cart = useSelector(selectCart);
 const products: Product[] = useSelector(selectProducts);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const shipPrice = 10.0;

 const [showRemoveItemAlert, setShowRemoveItemAlert] = useState(false);
 const [showRemoveSizeAlert, setShowRemoveSizeAlert] = useState(false);
 const [removeItemId, setRemoveItemId] = useState<number | null>(null);

 const onAmountChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  id: number,
  name: string
 ) => {
  const amount = parseInt(e.target.value, 10);

  if (amount === 0) {
   openRemoveSizeAlert(id);
  } else {
   dispatch(changeAmount({ id, size: name, amount }));
  }
 };

 const calculateItemTotal = (product: Product, item: CartItem): number =>
  item.sizes.reduce(
   (itemSum, size) => itemSum + size.amount * product.price,
   0
  );

 const calculateTotalPrice = (): number =>
  cart.reduce((total: number, item: CartItem) => {
   const product = products.find((p) => p.id === item.id);
   return product ? total + calculateItemTotal(product, item) : total;
  }, 0);

 const openRemoveItemAlert = (id: number) => {
  setRemoveItemId(id);
 };

 const onConfirmRemoveItem = () => {
  if (removeItemId) {
   dispatch(removeItem({ id: removeItemId }));
   setShowRemoveItemAlert(false);
  }
 };

 const onCancelRemoveItem = () => {
  setShowRemoveItemAlert(false);
 };

 const openRemoveSizeAlert = (id: number) => {
  setRemoveItemId(id);
  setShowRemoveSizeAlert(true);
 };

 const onConfirmRemoveSize = () => {
  if (removeItemId) {
   dispatch(removeItem({ id: removeItemId }));
   setShowRemoveSizeAlert(false);
  }
 };

 const onCancelRemoveSize = () => {
  setShowRemoveSizeAlert(false);
 };

 return (
  <div className="cart">
   {showRemoveItemAlert && (
    <AlertWindow
     title="Are you sure you want to remove this item?"
     confirmFunction={onConfirmRemoveItem}
     cancelFunction={onCancelRemoveItem}
    />
   )}
   {showRemoveSizeAlert && (
    <AlertWindow
     title="Are you sure you want to remove this size?"
     confirmFunction={onConfirmRemoveSize}
     cancelFunction={onCancelRemoveSize}
    />
   )}
   {cart.length > 0 ? (
    <div className="products">
     {cart.map((item: CartItem) =>
      products
       .filter((product) => product.id === item.id)
       .map((product) => (
        <CartTile
         key={product.id}
         product={product}
         item={item}
         setShowRemoveItemAlert={setShowRemoveItemAlert}
         openRemoveItemAlert={openRemoveItemAlert}
         openRemoveSizeAlert={openRemoveSizeAlert}
         onAmountChange={onAmountChange}
         calculateItemTotal={calculateItemTotal}
        />
       ))
     )}
    </div>
   ) : (
    <div className="empty-cart-message">
     <ShoppingCartIcon />
     Your cart is empty
    </div>
   )}
   <div className="summation">
    <p className="summation__subsection">
     <span>Value: </span>
     <span>{calculateTotalPrice().toFixed(2)} $</span>
    </p>
    {cart.length > 0 && (
     <>
      <p className="summation__subsection">
       <span>Ship: </span>
       <span>{shipPrice} $</span>
      </p>
      <p className="summation__subsection">
       <span>Total: </span>
       <span>{(calculateTotalPrice() + shipPrice).toFixed(2)} $</span>
      </p>
     </>
    )}
    <div className="summation__buttons">
     <button
      className="summation__button"
      disabled={cart.length === 0}
      onClick={() => navigate("/payment")}
     >
      Pay
     </button>
     <button
      className="summation__button"
      onClick={() => navigate("/home")}
     >
      Continue shopping
     </button>
    </div>
   </div>
  </div>
 );
};

export default Cart;
