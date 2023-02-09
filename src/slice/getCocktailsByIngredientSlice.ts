import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SingleCocktail } from "../model/cocktailModel";

interface SearchedCocktailsByIngredient {
  drinks: SingleCocktail[];
  loading: boolean;
  error: string;
}

interface getCocktailsByIngredientResponse {
  drinks: SingleCocktail[];
}

const initialSearchedCocktailsByIngredientState: SearchedCocktailsByIngredient =
  {
    drinks: [],
    loading: false,
    error: "",
  };

export const getCocktailsByIngredient = createAsyncThunk<
  SingleCocktail[],
  string
>("cocktails/getCocktailsByIngredient", async (ingredient) => {
  const cocktails = await axios.get<getCocktailsByIngredientResponse>(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  return cocktails.data.drinks;
});

const searchedCocktailsByIngredientSlice = createSlice({
  name: "searchedCocktailsByIngredient",
  initialState: initialSearchedCocktailsByIngredientState,
  reducers: {
    clearIngredientsCocktailsState: (state) => {
      state.drinks = [];
      state.error = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCocktailsByIngredient.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.drinks = [];
    });
    builder.addCase(getCocktailsByIngredient.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.drinks = action.payload;
    });
    builder.addCase(getCocktailsByIngredient.rejected, (state, action) => {
      state.loading = false;
      state.drinks = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
  },
});

export default searchedCocktailsByIngredientSlice.reducer;
export const { clearIngredientsCocktailsState } =
  searchedCocktailsByIngredientSlice.actions;
