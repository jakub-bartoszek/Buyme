import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Product } from "../../App";
import { CartItem } from "../../pages/Cart/Cart";
import "./styles.scss";

const CartTile = ({
 product,
 item,
 setShowRemoveItemAlert,
 openRemoveItemAlert,
 openRemoveSizeAlert,
 onAmountChange,
 calculateItemTotal
}: {
 product: Product;
 item: CartItem;
 setShowRemoveItemAlert: React.Dispatch<React.SetStateAction<boolean>>;
 openRemoveItemAlert: (id: number) => void;
 openRemoveSizeAlert: (id: number) => void;
 onAmountChange: (
  e: React.ChangeEvent<HTMLSelectElement>,
  id: number,
  name: string
 ) => void;
 calculateItemTotal: (product: Product, item: CartItem) => number;
}) => (
 <div
  className="cart-tile"
  key={product.id}
 >
  <div
   className="cart-tile__remove-button"
   onClick={() => {
    setShowRemoveItemAlert(true);
    openRemoveItemAlert(item.id);
   }}
  >
   <TrashIcon />
  </div>
  <Link
   to={`/product/${product.id}`}
   className="cart-tile__image"
  >
   {product.images && (
    <img
     src={product.images[0]}
     alt={product.name}
    />
   )}
  </Link>
  <p className="cart-tile__name">{product.name}</p>
  <p className="cart-tile__price">{product.price} $</p>
  <div className="cart-tile__sizes">
   {item.sizes.map((size) => (
    <div
     key={size.name}
     className="cart-tile__size"
    >
     <span className="cart-tile__size-name">{size.name}</span>
     <select
      className="cart-tile__amount"
      defaultValue={size.amount}
      value={size.amount}
      onChange={(e) => {
       onAmountChange(e, product.id, size.name);
       if (parseInt(e.target.value, 10) === 0) {
        openRemoveSizeAlert(product.id);
       }
      }}
     >
      {[...Array(21).keys()].map((num) => (
       <option
        key={num}
        value={num}
       >
        {num}
       </option>
      ))}
     </select>
    </div>
   ))}
  </div>
  <p className="cart-tile__total">
   <span>Total: </span>
   <span>{calculateItemTotal(product, item).toFixed(2)} $</span>
  </p>
 </div>
);

export default CartTile;
