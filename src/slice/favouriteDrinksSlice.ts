import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cocktail } from "../model/cocktailModel";

interface favouriteDrinksState {
  favouriteDrinks: Cocktail[];
}

const initialFavouriteState: favouriteDrinksState = {
  favouriteDrinks: [],
};

const favouriteDrinksSlice = createSlice({
  name: "favouriteDrinks",
  initialState: initialFavouriteState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Cocktail>) => {
      state.favouriteDrinks.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favouriteDrinks = state.favouriteDrinks.filter(
        (drink) => drink.idDrink !== action.payload
      );
    },
    clearFavourites: (state) => {
      state.favouriteDrinks = [];
    },
  },
});

export default favouriteDrinksSlice.reducer;
export const { addFavourite, removeFavourite, clearFavourites } =
  favouriteDrinksSlice.actions;
