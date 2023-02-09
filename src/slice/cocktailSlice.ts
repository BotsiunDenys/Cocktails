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

export const getCocktailByName = createAsyncThunk<Cocktail[], string>(
  "cocktails/getCocktailsByName",
  async (name) => {
    const cocktails = await axios.get<getCocktailResponse>(
      `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    return cocktails.data.drinks;
  }
);

export const getCocktailByFirstLetter = createAsyncThunk<Cocktail[], string>(
  "cocktails/getCocktailsByFirstLetter",
  async (name) => {
    const cocktails = await axios.get<getCocktailResponse>(
      `https://thecocktaildb.com/api/json/v1/1/search.php?f=${name}`
    );
    return cocktails.data.drinks;
  }
);

export const getOneCocktail = createAsyncThunk<Cocktail[], string | undefined>(
  "cocktails/getOneCocktail",
  async (id) => {
    const cocktails = await axios.get<getCocktailResponse>(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );    
    return cocktails.data.drinks;
  }
);

export const getOneRandom = createAsyncThunk<Cocktail[]>(
  "cocktails/getOneRandom",
  async () => {
    const cocktails = await axios.get<getCocktailResponse>(
      `https://thecocktaildb.com/api/json/v1/1/random.php`
    );
    return cocktails.data.drinks;
  }
);

export const getTenRandom = createAsyncThunk<Cocktail[]>(
  "cocktails/getTenRandom",
  async () => {
    const options = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
      headers: {
        "X-RapidAPI-Key": "f2169d0fa9msh40636dae531b068p132074jsn249ea20ff57d",
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };
    const cocktails = await axios.request<getCocktailResponse>(options);
    return cocktails.data.drinks;
  }
);

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: initialCocktailsState,
  reducers: {
    clearCocktailsState: (state) => {
      state.cocktails = [];
      state.error = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCocktailByName.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.cocktails = [];
    });
    builder.addCase(getCocktailByName.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cocktails = action.payload;
    });
    builder.addCase(getCocktailByName.rejected, (state, action) => {
      state.loading = false;
      state.cocktails = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(getCocktailByFirstLetter.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.cocktails = [];
    });
    builder.addCase(getCocktailByFirstLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cocktails = action.payload;
    });
    builder.addCase(getCocktailByFirstLetter.rejected, (state, action) => {
      state.loading = false;
      state.cocktails = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(getOneRandom.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.cocktails = [];
    });
    builder.addCase(getOneRandom.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cocktails = action.payload;
    });
    builder.addCase(getOneRandom.rejected, (state, action) => {
      state.loading = false;
      state.cocktails = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(getTenRandom.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.cocktails = [];
    });
    builder.addCase(getTenRandom.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cocktails = action.payload;
    });
    builder.addCase(getTenRandom.rejected, (state, action) => {
      state.loading = false;
      state.cocktails = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase(getOneCocktail.pending, (state) => {
      state.cocktails = [];
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getOneCocktail.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.cocktails = action.payload;
    });
    builder.addCase(getOneCocktail.rejected, (state, action) => {
      state.loading = false;
      state.cocktails = [];
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
  },
});

export default cocktailsSlice.reducer;
export const { clearCocktailsState } = cocktailsSlice.actions;
