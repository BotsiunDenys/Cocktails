import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cocktail } from "../model/cocktailModel";

interface CocktailsState {
  cocktails: Cocktail[];
  loading: boolean;
  error: string;
}

interface getCocktailResponse {
  drinks: Cocktail[];
}

const initialCocktailsState: CocktailsState = {
  cocktails: [],
  loading: false,
  error: "",
};

export const getCocktail = createAsyncThunk<Cocktail[], string>(
  "cocktails/getCocktails",
  async (name) => {
    const cocktails = await axios.get<getCocktailResponse>(
      `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    return cocktails.data.drinks;
  }
);

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: initialCocktailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCocktail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.cocktails = [];
    });
    builder.addCase(getCocktail.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cocktails = action.payload;
    });
    builder.addCase(getCocktail.rejected, (state, action) => {
      state.loading = false;
      state.cocktails = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
  },
});

export default cocktailsSlice.reducer;
