import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  status?: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
};

// this is a slice that doesn't have a ASYNC method, so we don't need asyncThunk
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state) => {
      state.value += 1;
    }),
    decrement: create.reducer((state) => {
      state.value -= 1;
    }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCount: (state) => state.value,
  },
});

// Action creators are generated for each case reducer function.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCount } = counterSlice.selectors;

/**
 * this is an example of managing the state without using any API calls
 */
