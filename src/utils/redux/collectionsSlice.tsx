import { createSlice } from "@reduxjs/toolkit";
import { Collection } from "../../App";

interface CollectionsState {
 collectionsSlice: {
  collections: Collection[];
 };
}

const collectionsSlice = createSlice({
 name: "collections",
 initialState: {
  collections: []
 },
 reducers: {
  fetchCollections: () => {},
  setCollections: (state, { payload }) => {
   state.collections = payload;
  }
 }
});

export const { setCollections, fetchCollections } = collectionsSlice.actions;

export const selectCollections = (state: CollectionsState) => state.collectionsSlice.collections;

export default collectionsSlice.reducer;
