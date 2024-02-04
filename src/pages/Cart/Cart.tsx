import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Product } from "../../App";
import CartTile from "../../components/CartTile/CartTile";
import AlertWindow from "../../components/AlertWindow/AlertWindow";
import { changeAmount, removeItem, selectCart } from "../../utils/redux/cartSlice";
import { selectProducts } from "../../utils/redux/productsSlice";
import "./Cart.scss";

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
 const [selectedProductId, setSelectedProductId] = useState<number | null>(
  null
 );
 const [selectedSizeName, setSelectedSizeName] = useState<string | null>(null);

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

 const onAmountChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  productId: number,
  sizeName: string
 ) => {
  const amount = parseInt(e.target.value, 10);

  const productIndex = cart.findIndex((item) => item.id === productId);

  if (amount === 0) {
   const isLastSize = cart[productIndex].sizes.length === 1;

   if (isLastSize) {
    openRemoveItemAlert(productId);
   } else {
    openRemoveSizeAlert(productId);
   }

   setSelectedProductId(productId);
   setSelectedSizeName(sizeName);
  } else {
   dispatch(changeAmount({ id: productId, size: sizeName, amount }));
  }
 };

 const openRemoveItemAlert = (id: number) => {
  setSelectedProductId(id);
  setShowRemoveItemAlert(true);
 };

 const onConfirmRemoveItem = () => {
  if (selectedProductId) {
   dispatch(removeItem({ id: selectedProductId }));
   setShowRemoveItemAlert(false);
  }
 };

 const onCancelRemoveItem = () => {
  setShowRemoveItemAlert(false);
 };

 const openRemoveSizeAlert = (id: number) => {
  setSelectedProductId(id);
  setShowRemoveSizeAlert(true);
 };

 const onConfirmRemoveSize = () => {
  if (selectedProductId && selectedSizeName) {
   dispatch(
    changeAmount({ id: selectedProductId, size: selectedSizeName, amount: 0 })
   );
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
         openRemoveItemAlert={openRemoveItemAlert}
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
