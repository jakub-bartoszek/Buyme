import { Product } from "../../App";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import "./styles.scss";
export interface CartItem {
 id: number;
 sizes: { name: string; amount: number }[];
}

export default function Cart() {
 const storedCart = localStorage.getItem("cart");
 const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
 const products: Product[] = useSelector(selectProducts);

 console.log(
  cart[2].sizes
   .map((size) => size.amount)
   .reduce((partialSum, a) => partialSum + a, 0)
 );

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
        <table className="products__tile--table">
         <thead>
          <tr>
           <th>{product.name}</th>
           <th>Each</th>
           <th>Total</th>
          </tr>
         </thead>
         <tbody>
          <tr>
           <td>
            {item.sizes.map((size) => (
             <p
              key={size.name}
              className="products__tile--sizes"
             >
              {size.name}: {size.amount}
             </p>
            ))}
           </td>
           <td>{product.price}</td>
           <td>
            {product.price *
             item.sizes
              .map((size) => size.amount)
              .reduce((partialSum, a) => partialSum + a, 0)}
           </td>
          </tr>
         </tbody>
        </table>
       </div>
      ))
    )}
   </div>
   <div></div>
  </div>
 );
}
