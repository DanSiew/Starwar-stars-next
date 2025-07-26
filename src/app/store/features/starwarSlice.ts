import { StarwarStateModel } from '@/app/models/starwar.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE: StarwarStateModel = {
    status: 'idle',
    data: undefined,
    currentPage: 1
};


export const starwarSlice = createSlice({
    name: 'starwar',
    initialState: INITIAL_STATE,
    reducers: {
        fetchStart: (state, action) => {
            return {
                ...state,
                currentPage: action.payload.currentPage,
                status: 'idle'
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStarwarAsync.pending, (state) => {
            state.status = 'pending';
        })
            .addCase(getStarwarAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getStarwarAsync.rejected, (state) => {
                state.status = 'failed';

            })
    }
});


export const getStarwarAsync = createAsyncThunk(
    'starwar/getStarwarAsync',
    async (pageNum: number) => {
        const url = `https://swapi.py4e.com/api/people?page=${pageNum}`;
        const response = await fetch(url);
        let data = await response.json();
        const numberPages = Math.ceil(data.count / 10);
        const pageNumber = Array.from({ length: numberPages }, (_, index) => index + 1);
        data = { ...data, numberPages, pageNumber, currentPage: pageNum };
        return data;
    },
    {
        condition: (_, { getState, extra }) => {
            const state: any = getState();
            const fetchStatus = state.starwar.status;
            if (fetchStatus === 'succeeded' || fetchStatus === 'pending') {
                // Already fetched or in progress, don't need to re-fetch
                return false
            }
        }
    }
);

export const { fetchStart } = starwarSlice.actions;

export default starwarSlice.reducer;