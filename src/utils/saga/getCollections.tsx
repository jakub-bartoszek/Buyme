import axios from "axios";

export const getCollections = async () => {
 const response = await axios.get("./collections.json", {
  headers: {
   accept: "application/json"
  }
 });

 return response.data;
};
