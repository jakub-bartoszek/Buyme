import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import { Product } from "../../App";
import "./Shop.scss";
import Filters from "../../components/Filters/Filters";
import Searchbar from "../../components/Searchbar/Searchbar";
import ShopTile from "../../components/ShopTile/ShopTile";

const Shop: React.FC = () => {
 const [searchParams] = useSearchParams();

 const searchQueryParam = searchParams.get("query");
 const minPriceParam = parseInt(searchParams.get("min_price") || "", 10);
 const maxPriceParam = parseInt(searchParams.get("max_price") || "", 10);
 const categoriesParam = (searchParams.get("categories") || "").split(",");
 const genderParam = (searchParams.get("gender") || "").split(",");
 const productTypeParam = (searchParams.get("product_type") || "").split(",");
 const ageGroupParam: string = searchParams.get("age_group") || "";
 const sortOrderParam: string = searchParams.get("sort_order") || "";
 const sortByParam: string = searchParams.get("sortBy") || "popularity";
 const products: Product[] = useSelector(selectProducts);

 const sortProducts = (a: Product, b: Product) => {
  switch (sortByParam) {
   case "price":
    return sortOrderParam === "asc" ? a.price - b.price : b.price - a.price;
   case "popularity":
    return sortOrderParam === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity;
   case "alphabetically":
    return sortOrderParam === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
   default:
    return 0;
  }
 };

 const filteredProducts = products.filter(
  (product) =>
   (searchQueryParam
    ? product?.name.toLowerCase().includes(searchQueryParam.toLowerCase())
    : true) &&
   (minPriceParam ? product?.price > minPriceParam : true) &&
   (maxPriceParam ? product?.price < maxPriceParam : true) &&
   (categoriesParam.length === 0 ||
    categoriesParam[0] === "" ||
    product?.categories.some((cat) => categoriesParam.includes(cat))) &&
   (ageGroupParam ? product?.age_group.includes(ageGroupParam) : true) &&
   (genderParam.length === 0 ||
    genderParam[0] === "" ||
    product?.gender.some((g) => genderParam.includes(g))) &&
   (productTypeParam.length === 0 ||
    productTypeParam[0] === "" ||
    productTypeParam.includes(product?.product_type))
 );

 const sortedProducts = filteredProducts.slice().sort(sortProducts);

 return (
  <main className="search">
   <div>
    <Filters products={products} />
   </div>
   <div>
    <Searchbar />
    <section
     className="section"
     id="results"
    >
     {sortedProducts.map((product) => (
      <ShopTile
       key={product.id}
       product={product}
      />
     ))}
    </section>
   </div>
  </main>
 );
};

export default Shop;
