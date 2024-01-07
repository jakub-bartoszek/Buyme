import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "../../pages/Home/Home";
import "./styles.scss";

export default function ProductPage() {
 const [product, setProduct] = useState<Product | null>(null);
 const { id } = useParams();
 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
 const [chosenSize, setChosenSize] = useState<string | null>(null);
 const [amount, setAmount] = useState<number>(0);

 const fetchProducts = async () => {
  try {
   const response = await fetch("./products.json", {
    headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
    }
   });
   const fetchedProducts: Product[] = await response.json();
   const selectedProduct = fetchedProducts.find((p) => p.id.toString() === id);

   if (selectedProduct) {
    setProduct(selectedProduct);
    if (selectedProduct.images && selectedProduct.images.length > 0) {
     setActiveImageIndex(
      selectedProduct.images && selectedProduct.images.length > 0 ? 0 : null
     );
    }
   } else {
    console.error("Product not found");
   }
  } catch (error) {
   console.error("Error fetching product:", error);
  }
 };

 useEffect(() => {
  fetchProducts();
 }, [id]);

 const handleImageClick = (index: number) => {
  setActiveImageIndex(index);
 };

 return (
  <main className="product">
   <div className="product-gallery">
    <div className="product-gallery__images-small">
     {product?.images &&
      product.images.map((image, index) => (
       <div
        className={`product-gallery__image-small ${
         index === activeImageIndex ? "active" : ""
        }`}
        key={index}
       >
        <img
         src={image}
         onClick={() => handleImageClick(index)}
         alt={`Product Image ${index}`}
        />
       </div>
      ))}
    </div>
    {activeImageIndex !== null && product?.images && (
     <div className="product-gallery__image-main">
      <img
       src={product.images[activeImageIndex]}
       alt="Main Product Image"
      />
     </div>
    )}
   </div>
   <div className="product-info">
    <h2>{product?.name}</h2>
    <p>{product?.price} $</p>
    <div className="product-info__sizes">
     {product?.available_sizes.map((size) => (
      <button
       className={`product-info__size ${size == chosenSize && "chosen"}`}
       onClick={() => setChosenSize(size)}
      >
       {size}
      </button>
     ))}
    </div>
    <div className="product-info__amount">
     <button
      disabled={amount === 0}
      className="product-info__amount--button"
      onClick={() => amount > 0 && setAmount((amount) => amount - 1)}
     >
      -
     </button>
     <div className="product-info__amount--number">{amount}</div>
     <button
      disabled={amount === 10}
      className="product-info__amount--button"
      onClick={() => amount < 10 && setAmount((amount) => amount + 1)}
     >
      +
     </button>
    </div>
    <div>
     <button
      disabled={chosenSize == null || amount == 0}
      className="product-info__buy-button"
     >
      ADD TO CART
     </button>
    </div>
   </div>
   <div className="product-description">{product?.description}</div>
  </main>
 );
}
