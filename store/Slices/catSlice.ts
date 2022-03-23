import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import catApi from "../apis/catApi";

export const fetchCats = createAsyncThunk("cats/fetchCats", async () => {
  const response = await catApi.GET("/breeds");
  return response.data;
});

interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
}
interface WeightType {
  imperial: string;
  metric: string;
}
interface CatTypes {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  image: ImageType;
  indoor: number;
  intelligence: number;
  lap: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vocalisation: number;
  weight: WeightType;
  wikipedia_url: string;
  show: boolean;
}

const initialState: { loading: boolean; error: string; cat_list: CatTypes[] } =
  {
    loading: false,
    error: "",
    cat_list: [],
  };

const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    getCats: (state) => {
      state.loading = true;
    },
    getCatsSuccess: (state, { payload }) => {
      state.cat_list = payload;
    },
    getCatsFailure: (state, { payload }) => {
      state.cat_list = [];
      state.loading = false;
      state.error = payload;
    },
    changeShowTrue: (state, { payload }) => {
      console.log(payload);
      state.cat_list.map((cur, idx) => {
        if (cur.id === payload) {
          state.cat_list[idx].show = true;
        }
      });
    },
    changeShowFalse: (state, { payload }) => {
      console.log(payload);
      state.cat_list.map((cur, idx) => {
        if (cur.id === payload) {
          state.cat_list[idx].show = false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      //   console.log(action.payload);
      action.payload.map(
        (Cat: CatTypes, idx: number) => (action.payload[idx].show = false)
      );
      state.cat_list = [...action.payload];
    });
  },
});

export const {
  getCats,
  getCatsSuccess,
  getCatsFailure,
  changeShowTrue,
  changeShowFalse,
} = catSlice.actions;
export default catSlice.reducer;
