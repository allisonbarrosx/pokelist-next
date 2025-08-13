import { createSlice } from "@reduxjs/toolkit";

export interface DialogState {
  isShowDialog: boolean;
}

const initialState: DialogState = {
  isShowDialog: false,
};

export const dialogSlice = createSlice({
  name: "Dialog",
  initialState,
  reducers: (create) => ({
    show: create.reducer((state) => {
      state.isShowDialog = true;
    }),
    hide: create.reducer((state) => {
      state.isShowDialog = false;
    }),
  }),
  selectors: {
    isShowDialog: (state) => state.isShowDialog,
  },
});

// actions
export const { show, hide } = dialogSlice.actions;

// selectors
export const { isShowDialog } = dialogSlice.selectors;
