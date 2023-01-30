import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import cocktailSlice from "../slice/cocktailSlice";
import favouriteDrinksSlice from "../slice/favouriteDrinksSlice";
import favouriteVisibilitySlice from "../slice/favouriteVisibilitySlice";
const store = configureStore({
  reducer: {
    cocktails: cocktailSlice,
    favouriteDrinks: favouriteDrinksSlice,
    favouriteVisibility: favouriteVisibilitySlice,
  },
});

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
