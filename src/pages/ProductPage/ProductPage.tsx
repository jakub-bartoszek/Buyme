import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "../../pages/Home/Home";
import "./styles.scss";

export default function ProductPage() {
 const [product, setProduct] = useState<Product | null>(null);
 const { id } = useParams();
 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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
  <main className="wrapper">
   <div className="product">
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
       <button className="product-info__size">{size}</button>
      ))}
     </div>
     <div className="product-info__amount">
      <button>-</button>
      <div>0</div>
      <button>+</button>
      <div>
       <button>Dodaj do koszyka</button>
      </div>
     </div>
    </div>
    <div className="product-description">
     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi reiciendis
     illum hic assumenda rem. Magnam saepe sint suscipit repudiandae facilis,
     sed praesentium molestias aliquam perferendis, numquam veniam, aperiam
     nisi! Quia.
    </div>
   </div>
  </main>
 );
}
