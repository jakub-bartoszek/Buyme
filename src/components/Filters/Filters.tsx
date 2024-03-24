import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { Product } from "../../App";
import Filter from "../../components/Filter/Filter";
import "./multirangeslider.scss";
import "./Filters.scss";

interface FiltersProps {
 products: Product[];
}

const Filters: React.FC<FiltersProps> = ({ products }) => {
 const [searchParams, setSearchParams] = useSearchParams();

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
  if (searchParams.has("min_price") && searchParams.has("max_price")) {
   setMinPrice(parseInt(searchParams.get("min_price") || "0"));
   setMaxPrice(parseInt(searchParams.get("max_price") || "500"));
  } else {
   setMinPrice(0);
   setMaxPrice(500);
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
  if (searchParams.has("product_type")) {
   setProductType((searchParams.get("product_type") || "").split(","));
  } else {
   setProductType([]);
  }
  if (searchParams.has("age_group")) {
   setAgeGroup(searchParams.get("age_group") || "");
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

   if (minPrice) newSearchParams.set("min_price", minPrice.toString());
   else newSearchParams.delete("min_price");

   if (maxPrice) newSearchParams.set("max_price", maxPrice.toString());
   else newSearchParams.delete("max_price");

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
    newSearchParams.set("product_type", productType.join(","));
   } else {
    newSearchParams.delete("product_type");
   }

   if (ageGroup) {
    newSearchParams.set("age_group", ageGroup);
   } else {
    newSearchParams.delete("age_group");
   }

   setSearchParams(newSearchParams);
  }
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

 const handleGenderChange = (gender: string) => {
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

 return (
  <form
   className="filters"
   onSubmit={handleFiltersSubmit}
  >
   <Filter
    filterType="Price"
    visible={filterStates.price.visible}
    onFilterToggle={() => handleFilterToggle("price")}
   >
    <div className="filters__filter--range-slider-container">
     <MultiRangeSlider
      min={0}
      max={500}
      step={20}
      minValue={minPriceSlider || 0}
      maxValue={maxPriceSlider || 500}
      ruler={false}
      label={false}
      onChange={handleSliderInput}
      baseClassName="filters__filter--range-slider"
     />
    </div>
    <div className="filters__filter--values-container">
     <div className={`filters__filter--field ${minPriceSlider > maxPriceSlider && "incorrect"}`}>
      <span>$</span>
      <input
       min={0}
       max={500}
       maxLength={3}
       type="number"
       value={minPriceSlider !== null ? minPriceSlider : ""}
       onChange={handleMinPriceChange}
      />
     </div>
     <span>to</span>
     <div className={`filters__filter--field ${minPriceSlider > maxPriceSlider && "incorrect"}`}>
      <span>$</span>
      <input
       min={0}
       max={500}
       maxLength={3}
       type="number"
       value={maxPriceSlider !== null ? maxPriceSlider : ""}
       onChange={handleMaxPriceChange}
      />
     </div>
    </div>
   </Filter>
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
         onChange={() => handleGenderChange(individualGender)}
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
 );
};

export default Filters;
