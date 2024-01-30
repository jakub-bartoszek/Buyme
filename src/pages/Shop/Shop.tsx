import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChangeResult } from "multi-range-slider-react";
import Tile from "../../components/Tile/Tile";
import { selectProducts } from "../../utils/redux/productsSlice";
import { Product } from "../../App";
import "./styles.scss";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import Filter from "../../components/Filter/Filter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

const Shop: React.FC = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const searchQueryParam = searchParams.get("query");
 const minPriceParam = parseInt(searchParams.get("minPrice") || "", 10);
 const maxPriceParam = parseInt(searchParams.get("maxPrice") || "", 10);
 const categoriesParam = (searchParams.get("categories") || "").split(",");
 const genderParam = (searchParams.get("gender") || "").split(",");
 const productTypeParam = (searchParams.get("productType") || "").split(",");
 const ageGroupParam: string = searchParams.get("ageGroup") || "";
 const products: Product[] = useSelector(selectProducts);

 const [searchQuery, setSearchQuery] = useState<string>("");
 const [minPrice, setMinPrice] = useState<number>(0);
 const [maxPrice, setMaxPrice] = useState<number>(500);
 const [minPriceSlider, setMinPriceSlider] = useState<number>(0);
 const [maxPriceSlider, setMaxPriceSlider] = useState<number>(500);
 const [categories, setCategories] = useState<string[]>([]);
 const [gender, setGender] = useState<string[]>([]);
 const [productType, setProductType] = useState<string[]>([]);
 const [ageGroup, setAgeGroup] = useState<string>("adults");

 const [filterStates, setFilterStates] = useState({
  price: { visible: true },
  categories: { visible: false },
  gender: { visible: false },
  productType: { visible: false },
  ageGroup: { visible: false }
 });

 const allCategories = Array.from(new Set(products.flatMap((product) => product.categories)));
 const allGenders = Array.from(new Set(products.flatMap((product) => product.gender)));
 const allProductTypes = Array.from(new Set(products.flatMap((product) => product.product_type)));
 const allAgeGroups = Array.from(new Set(products.flatMap((product) => product.age_group)));

 useEffect(() => {
  if (!searchParams.has("minPrice") && !searchParams.has("maxPrice")) {
   setMinPrice(0);
   setMaxPrice(500);
  }

  if (minPriceParam < maxPriceParam) {
   setMinPrice(minPriceParam);
   setMaxPrice(maxPriceParam);
   setMinPriceSlider(minPriceParam);
   setMaxPriceSlider(maxPriceParam);
  }
 }, [searchParams, minPriceParam, maxPriceParam]);

 useEffect(() => {
  if (searchParams.has("query")) {
   setSearchQuery(searchQuery);
  } else {
   setSearchQuery("");
  }
  if (searchParams.has("categories")) {
   setCategories((searchParams.get("categories") || "").split(","));
  } else {
   setCategories([]);
  }
  if (searchParams.has("gender")) {
   setGender((searchParams.get("gender") || "").split(","));
  } else {
   setGender([]);
  }
  if (searchParams.has("productType")) {
   setProductType((searchParams.get("productType") || "").split(","));
  } else {
   setProductType([]);
  }
  if (searchParams.has("ageGroup")) {
   setAgeGroup(searchParams.get("ageGroup") || "");
  } else {
   setAgeGroup("adults");
  }
 }, [searchParams]);

 const handleFilterToggle = (filterType: keyof typeof filterStates) => {
  setFilterStates((prevStates) => ({
   ...prevStates,
   [filterType]: {
    ...prevStates[filterType],
    visible: !prevStates[filterType].visible
   }
  }));
 };

 const handleFiltersSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (minPrice < maxPrice) {
   const newSearchParams = new URLSearchParams(searchParams);

   if (minPrice) newSearchParams.set("minPrice", minPrice.toString());
   else newSearchParams.delete("minPrice");

   if (maxPrice) newSearchParams.set("maxPrice", maxPrice.toString());
   else newSearchParams.delete("maxPrice");

   if (categories.length > 0) {
    newSearchParams.set("categories", categories.join(","));
   } else {
    newSearchParams.delete("categories");
   }

   if (gender.length > 0) {
    newSearchParams.set("gender", gender.join(","));
   } else {
    newSearchParams.delete("gender");
   }

   if (productType.length > 0) {
    newSearchParams.set("productType", productType.join(","));
   } else {
    newSearchParams.delete("productType");
   }

   if (ageGroup) {
    newSearchParams.set("ageGroup", ageGroup);
   } else {
    newSearchParams.delete("ageGroup");
   }

   setSearchParams(newSearchParams);
  }
 };

 const handleQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newSearchParams = new URLSearchParams(searchParams);

  if (searchQuery) newSearchParams.set("query", searchQuery);
  else newSearchParams.delete("query");

  setSearchParams(newSearchParams);
 };

 const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
 };

 const handleSliderInput = (e: ChangeResult) => {
  setMinPrice(e.minValue);
  setMaxPrice(e.maxValue);
  if (e.minValue <= e.maxValue) {
   setMinPriceSlider(e.minValue);
   setMaxPriceSlider(e.maxValue);
  }
 };

 const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
   if (maxPrice < 20) {
    setMaxPrice(20);
    setMaxPriceSlider(20);
    setMinPrice(0);
    setMinPriceSlider(0);
   } else {
    setMinPrice(value <= maxPrice - 20 ? Math.max(0, value) : maxPrice - 20);
    setMinPriceSlider(
     Math.min(value <= maxPrice - 20 ? Math.max(0, value) : maxPrice - 20, maxPrice)
    );
   }
  }
 };

 const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
   setMaxPrice(Math.max(0, Math.min(value, 500)));
   setMaxPriceSlider(Math.max(value, minPrice));
  }
 };

 const handleCategoryChange = (category: string) => {
  setCategories((prevCategories) => {
   if (prevCategories.includes(category)) {
    return prevCategories.filter((c) => c !== category);
   } else {
    return [...prevCategories, category];
   }
  });
 };

 const handleAgeGroupChange = (selectedAgeGroup: string) => {
  setAgeGroup(selectedAgeGroup);
  setGender([]);
 };

 const handleGender = (gender: string) => {
  setGender((prevGender) => {
   if (prevGender.includes(gender)) {
    return prevGender.filter((c) => c !== gender);
   } else {
    return [...prevGender, gender];
   }
  });
 };

 const handleProductTypeChange = (type: string) => {
  setProductType((prevProductType) => {
   if (prevProductType.includes(type)) {
    return prevProductType.filter((t) => t !== type);
   } else {
    return [...prevProductType, type];
   }
  });
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

 return (
  <main className="search">
   <div>
    <form
     className="filters"
     onSubmit={handleFiltersSubmit}
    >
     <PriceFilter
      min={0}
      max={500}
      step={20}
      minValue={minPriceSlider || 0}
      maxValue={maxPriceSlider || 500}
      visible={filterStates.price.visible}
      onFilterToggle={() => handleFilterToggle("price")}
      onSliderInput={handleSliderInput}
      onMinPriceChange={handleMinPriceChange}
      onMaxPriceChange={handleMaxPriceChange}
     />
     <Filter
      filterType="Age group"
      visible={filterStates.ageGroup.visible}
      onFilterToggle={() => handleFilterToggle("ageGroup")}
     >
      <ul className="filters__category-list">
       {allAgeGroups.map((group) => (
        <li
         key={group}
         className="filters__category-item"
        >
         <input
          type="radio"
          id={group}
          className="filters__category-checkbox"
          checked={ageGroup.includes(group)}
          onChange={() => handleAgeGroupChange(group)}
         />
         <label
          htmlFor={group}
          className="filters__category-label"
         >
          {group.charAt(0).toUpperCase() + group.slice(1)}
         </label>
        </li>
       ))}
      </ul>
     </Filter>
     <Filter
      filterType="Gender"
      visible={filterStates.gender.visible}
      onFilterToggle={() => handleFilterToggle("gender")}
     >
      <ul className="filters__category-list">
       {allGenders.map((individualGender) => {
        const isAdult = ageGroup === "adults";
        const isKids = ageGroup === "kids";
        if (isAdult && (individualGender === "boy" || individualGender === "girl")) {
         return null;
        }
        if (isKids && (individualGender === "men" || individualGender === "women")) {
         return null;
        }
        return (
         <li
          key={individualGender}
          className="filters__category-item"
         >
          <input
           type="checkbox"
           id={individualGender}
           className="filters__category-checkbox"
           checked={gender.includes(individualGender)}
           onChange={() => handleGender(individualGender)}
          />
          <label
           htmlFor={individualGender}
           className="filters__category-label"
          >
           {individualGender.charAt(0).toUpperCase() + individualGender.slice(1)}
          </label>
         </li>
        );
       })}
      </ul>
     </Filter>
     <Filter
      filterType="Product type"
      visible={filterStates.productType.visible}
      onFilterToggle={() => handleFilterToggle("productType")}
     >
      <ul className="filters__category-list">
       {allProductTypes.map((individualProductType) => (
        <li
         key={individualProductType}
         className="filters__category-item"
        >
         <input
          type="checkbox"
          id={individualProductType}
          className="filters__category-checkbox"
          checked={productType.includes(individualProductType)}
          onChange={() => handleProductTypeChange(individualProductType)}
         />
         <label
          htmlFor={individualProductType}
          className="filters__category-label"
         >
          {individualProductType.charAt(0).toUpperCase() + individualProductType.slice(1)}
         </label>
        </li>
       ))}
      </ul>
     </Filter>
     <Filter
      filterType="Categories"
      visible={filterStates.categories.visible}
      onFilterToggle={() => handleFilterToggle("categories")}
     >
      <ul className="filters__category-list">
       {allCategories.map((category) => (
        <li
         key={category}
         className="filters__category-item"
        >
         <input
          type="checkbox"
          id={category}
          className="filters__category-checkbox"
          checked={categories.includes(category)}
          onChange={() => handleCategoryChange(category)}
         />
         <label
          htmlFor={category}
          className="filters__category-label"
         >
          {category.charAt(0).toUpperCase() + category.slice(1)}
         </label>
        </li>
       ))}
      </ul>
     </Filter>
     <button className="filters__submit-button">Apply</button>
    </form>
   </div>
   <div>
    <form
     className="search-sort-container"
     onSubmit={handleQuerySubmit}
    >
     <div className="search-sort-container__input-wrapper">
      <div className="search-sort-container__search-icon">
       <MagnifyingGlassIcon />
      </div>
      <input
       className="search-sort-container__input"
       value={searchQuery}
       onChange={handleQueryChange}
      />
     </div>
     <div className="search-sort-container__sort-icon">
      <ArrowsUpDownIcon />
     </div>
    </form>
    <section
     className="section"
     id="results"
    >
     {filteredProducts.map((product) => (
      <Tile
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
