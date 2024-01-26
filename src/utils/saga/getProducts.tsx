import axios from "axios";

export const getProducts = async () => {
 const response = await axios.get("./products.json", {
  headers: {
   accept: "application/json"
  }
 });

 return response.data;
};
