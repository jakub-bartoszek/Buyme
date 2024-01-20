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
 // Redux hooks to access state and dispatch actions
 const cart = useSelector(selectCart);
 const products: Product[] = useSelector(selectProducts);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 // Shipping cost constant
 const shipPrice = 10.0;

 // Local state for alert modals
 const [showRemoveItemAlert, setShowRemoveItemAlert] = useState(false);
 const [showRemoveSizeAlert, setShowRemoveSizeAlert] = useState(false);
 const [removeItemId, setRemoveItemId] = useState<number | null>(null);

 // Function to handle amount change in CartTile
 const onAmountChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  id: number,
  name: string
 ) => {
  const amount = parseInt(e.target.value, 10);

  if (amount === 0) {
   // If amount is 0, open remove size alert
   openRemoveSizeAlert(id);
  } else {
   // Otherwise, dispatch changeAmount action
   dispatch(changeAmount({ id, size: name, amount }));
  }
 };

 // Calculate the total price for a specific item
 const calculateItemTotal = (product: Product, item: CartItem): number =>
  item.sizes.reduce(
   (itemSum, size) => itemSum + size.amount * product.price,
   0
  );

 // Calculate the total price of all items in the cart
 const calculateTotalPrice = (): number =>
  cart.reduce((total: number, item: CartItem) => {
   const product = products.find((p) => p.id === item.id);
   return product ? total + calculateItemTotal(product, item) : total;
  }, 0);

 // Open the remove item alert modal
 const openRemoveItemAlert = (id: number) => {
  setRemoveItemId(id);
 };

 // Confirm and execute removal of item
 const onConfirmRemoveItem = () => {
  if (removeItemId) {
   dispatch(removeItem({ id: removeItemId }));
   setShowRemoveItemAlert(false);
  }
 };

 // Cancel removal of item
 const onCancelRemoveItem = () => {
  setShowRemoveItemAlert(false);
 };

 // Open the remove size alert modal
 const openRemoveSizeAlert = (id: number) => {
  setRemoveItemId(id);
  setShowRemoveSizeAlert(true);
 };

 // Confirm and execute removal of size
 const onConfirmRemoveSize = () => {
  if (removeItemId) {
   dispatch(removeItem({ id: removeItemId }));
   setShowRemoveSizeAlert(false);
  }
 };

 // Cancel removal of size
 const onCancelRemoveSize = () => {
  setShowRemoveSizeAlert(false);
 };

 return (
  <div className="cart">
   {/* Remove Item Alert Modal */}
   {showRemoveItemAlert && (
    <AlertWindow
     title="Are you sure you want to remove this item?"
     confirmFunction={onConfirmRemoveItem}
     cancelFunction={onCancelRemoveItem}
    />
   )}

   {/* Remove Size Alert Modal */}
   {showRemoveSizeAlert && (
    <AlertWindow
     title="Are you sure you want to remove this size?"
     confirmFunction={onConfirmRemoveSize}
     cancelFunction={onCancelRemoveSize}
    />
   )}

   {/* Cart content */}
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
    // Display message when cart is empty
    <div className="empty-cart-message">
     <ShoppingCartIcon />
     Your cart is empty
    </div>
   )}

   {/* Cart summation section */}
   <div className="summation">
    {/* Total value subsection */}
    <p className="summation__subsection">
     <span>Value: </span>
     <span>{calculateTotalPrice().toFixed(2)} $</span>
    </p>

    {/* Shipping cost subsection */}
    {cart.length > 0 && (
     <>
      <p className="summation__subsection">
       <span>Ship: </span>
       <span>{shipPrice} $</span>
      </p>

      {/* Total cost subsection */}
      <p className="summation__subsection">
       <span>Total: </span>
       <span>{(calculateTotalPrice() + shipPrice).toFixed(2)} $</span>
      </p>
     </>
    )}

    {/* Cart action buttons */}
    <div className="summation__buttons">
     {/* Pay button */}
     <button
      className="summation__button"
      disabled={cart.length === 0}
      onClick={() => navigate("/payment")}
     >
      Pay
     </button>

     {/* Continue shopping button */}
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
