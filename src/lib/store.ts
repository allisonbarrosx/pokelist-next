import {
  Action,
  configureStore,
  ThunkAction,
  combineSlices,
} from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { counterAsyncSlice } from "./features/counter/counterAsyncSlice";
import { pokemonApiSlice } from "./features/pokemon/pokemonSlice";
import {
  pokemonDetailsApiSlice,
  pokemonDetailsSlice,
} from "./features/pokemon/pokemonDetailsSlice";
import { dialogSlice } from "./features/dialog/dialogSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(counterSlice, quotesApiSlice);
const rootReducer = combineSlices(
  counterSlice,
  counterAsyncSlice,
  dialogSlice,
  pokemonDetailsSlice,
  pokemonApiSlice,
  pokemonDetailsApiSlice
);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      // return getDefaultMiddleware().concat(quotesApiSlice.middleware);
      return getDefaultMiddleware()
        .concat(pokemonApiSlice.middleware)
        .concat(pokemonDetailsApiSlice.middleware);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
