import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

// `buildCreateSlice` allows us to create a slice with async thunks if we need :)
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
