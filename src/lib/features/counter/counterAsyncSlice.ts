import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { CounterState } from "./counterSlice";
import { AppThunk } from "@/lib/store";

const wait = () =>
  new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, 2000);
  });

const initialState: CounterState = {
  value: 0,
};

export const counterAsyncSlice = createAppSlice({
  name: "counterAsync",
  initialState,
  reducers: (create) => ({
    // we're going to use this to create an outside thunk
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      }
    ),
    incrementAsync: create.asyncThunk(
      async () => {
        await wait();
        return true;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.value += 1;
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    incrementByAmountAsync: create.asyncThunk(
      async (amount: number) => {
        await wait();
        return amount;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<number>) => {
          state.value += action.payload;
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectCount: (state) => state.value,
    selectStatus: (state) => state.status,
  },
});

// export slice actions
export const { incrementAsync, incrementByAmountAsync, incrementByAmount } =
  counterAsyncSlice.actions;

// export slice selectors
export const { selectCount, selectStatus } = counterAsyncSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here'cs an example of conditionally dispathing actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      // here we use the sync logic from the slice
      dispatch(incrementByAmount(amount));
    }
  };

/**
 * this is an example of managing the state without using any API calls
 */
