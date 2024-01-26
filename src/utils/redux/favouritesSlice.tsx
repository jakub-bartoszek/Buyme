import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavouriteItem } from "../../pages/Favourites/Favourites";

const getInitialFavouritesState = (): FavouriteItem[] => {
 const storedFavourites = localStorage.getItem("favourites");
 return storedFavourites ? JSON.parse(storedFavourites) : [];
};

const updateLocalStorage = (favourites: FavouriteItem[]) => {
 localStorage.setItem("favourites", JSON.stringify(favourites));
};

const findProductIndex = (favourites: FavouriteItem[], productId: number) =>
 favourites.findIndex((item) => item.id === productId);

interface FavouritesState {
 favouritesSlice: {
  favourites: FavouriteItem[];
 };
}

const favouritesSlice = createSlice({
 name: "favourites",
 initialState: {
  favourites: getInitialFavouritesState()
 },
 reducers: {
  addToFavourites: (state, action: PayloadAction<{ id: number }>) => {
   const { id } = action.payload;
   const productIndex = findProductIndex(state.favourites, id);

   if (productIndex === -1) {
    state.favourites.push({ id: id });
    updateLocalStorage(state.favourites);
   } else {
    state.favourites.splice(productIndex, 1);
   }
  }
 }
});

export const { addToFavourites } = favouritesSlice.actions;

export const selectFavourites = (state: FavouritesState) =>
 state.favouritesSlice.favourites;

export default favouritesSlice.reducer;
