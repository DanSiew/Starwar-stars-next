import { PeopleStateModel } from '@/models/starwar.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE: PeopleStateModel = {
    data: undefined,
    status: 'idle'
}


export const peopleSlice = createSlice({
    name: 'people',
    initialState: INITIAL_STATE,
    reducers: {
        loadPeopleData: (state, action) => {
            return {
                ...state,
                data: action.payload.data,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPeopleAsync.pending, (state) => {
            state.status = 'pending';
        })
            .addCase(getPeopleAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getPeopleAsync.rejected, (state) => {
                state.status = 'failed';

            })
    }
});

export const getPeopleAsync = createAsyncThunk(
    'people/getPeopleAsync',
    async (id: string) => {
        const url = `https://swapi.py4e.com/api/people/${id}`;
        const response = await fetch(url);
        let data = await response.json();
        data = { ...data, id: id };
        return data;
    },
    {
        condition: (_, { getState, extra }) => {
            const state: any = getState();
            const fetchStatus = state.people.status;
            if (fetchStatus === 'succeeded' || fetchStatus === 'pending') {
                // Already fetched or in progress, don't need to re-fetch
                return false
            }
        }
    }
);


export const { loadPeopleData } = peopleSlice.actions;

export default peopleSlice.reducer;