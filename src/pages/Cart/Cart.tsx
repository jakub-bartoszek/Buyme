import { Product } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import "./styles.scss";
import { changeAmount, selectCart } from "../../redux/cartSlice";
export interface CartItem {
 id: number;
 sizes: { name: string; amount: number }[];
}

export default function Cart() {
 const cart = useSelector(selectCart);
 const products: Product[] = useSelector(selectProducts);
 const dispatch = useDispatch();

 const onChangeHandler = (e, id: number, name: string) => {
  const amount = parseInt(e.target.value, 10);
  dispatch(changeAmount({ id: id, size: name, amount: amount }));
 };

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
        <div className="products__tile--image">
         {product.images && <img src={product.images[0]} />}
        </div>
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
        <p>
         <span>Total: </span>
         {(
          product.price *
          item.sizes
           .map((size) => size.amount)
           .reduce((partialSum, a) => partialSum + a, 0)
         ).toFixed(2)}
         <span> $</span>
        </p>
       </div>
      ))
    )}
   </div>
   <div></div>
  </div>
 );
}
