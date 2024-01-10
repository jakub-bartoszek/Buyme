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
        <div>
         <h3 className="products__tile--name">{product.name}</h3>
         {item.sizes.map((size) => (
          <p className="products__tile--sizes">
           {size.name}: {size.amount}
          </p>
         ))}
        </div>
       </div>
      ))
    )}
   </div>
  </div>
 );
}
