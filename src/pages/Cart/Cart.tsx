import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../App";
import "./styles.scss";
import { changeAmount, removeItem, selectCart } from "../../redux/cartSlice";
import { selectProducts } from "../../redux/productsSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export interface CartItem {
 id: number;
 sizes: { name: string; amount: number }[];
}

const Cart: React.FC = () => {
 const cart = useSelector(selectCart);
 const products: Product[] = useSelector(selectProducts);
 const dispatch = useDispatch();
 const shipPrice = 10.0;

 const onChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement>,
  id: number,
  name: string
 ) => {
  const amount = parseInt(e.target.value, 10);
  dispatch(changeAmount({ id: id, size: name, amount: amount }));
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

 return (
  <div className="cart">
   <div className="products">
    {cart.map((item: CartItem) =>
     products
      .filter((product) => product.id === item.id)
      .map((product) => (
       <div
        className="products__tile"
        key={product.id}
       >
        <div
         className="products__tile--remove-button"
         onClick={() => {
          dispatch(removeItem({ id: item.id }));
         }}
        >
         <TrashIcon />
        </div>
        <Link
         to={`/product/${product.id}`}
         className="products__tile--image"
        >
         {product.images && (
          <img
           src={product.images[0]}
           alt={product.name}
          />
         )}
        </Link>
        <p className="products__tile--name">{product.name}</p>
        <p className="products__tile--price">{product.price} $</p>
        <div className="products__tile--sizes">
         {item.sizes.map((size) => (
          <div
           key={size.name}
           className="products__tile--size"
          >
           <span className="products__tile--size-name">{size.name}</span>
           <select
            className="products__tile--amount"
            defaultValue={size.amount}
            onChange={(e) => onChangeHandler(e, product.id, size.name)}
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
        <p className="products__tile--total">
         <span>Total: </span>
         <span>{calculateItemTotal(product, item).toFixed(2)} $</span>
        </p>
       </div>
      ))
    )}
   </div>
   <div className="summation">
    <p className="summation__subsection">
     <span>Value of products: </span>
     <span>{calculateTotalPrice().toFixed(2)} $</span>
    </p>
    <p className="summation__subsection">
     <span>Ship: </span>
     <span>{shipPrice} $</span>
    </p>
    <p className="summation__subsection">
     <span>Total: </span>
     <span>{(calculateTotalPrice() + shipPrice).toFixed(2)} $</span>
    </p>
    <div className="summation__buttons">
     <button className="summation__button">Pay</button>
     <button className="summation__button">Continue shopping</button>
    </div>
   </div>
  </div>
 );
};

export default Cart;
