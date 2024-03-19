import { createSlice } from "@reduxjs/toolkit";
import { Collection } from "../../App";

interface CollectionsState {
 collectionsSlice: {
  collections: Collection[];
  status: string;
 };
}

const collectionsSlice = createSlice({
 name: "collections",
 initialState: {
  collections: [],
  status: "loading"
 },
 reducers: {
  fetchCollections: () => {},
  setCollections: (state, { payload }) => {
   state.collections = payload;
  },
  setCollectionsStatus: (state, { payload }) => {
   state.status = payload;
  }
 }
});

export const { setCollections, fetchCollections, setCollectionsStatus } = collectionsSlice.actions;

export const selectCollections = (state: CollectionsState) => state.collectionsSlice.collections;
export const selectCollectionsStatus = (state: CollectionsState) => state.collectionsSlice.status;

export default collectionsSlice.reducer;
