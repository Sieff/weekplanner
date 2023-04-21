import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Module} from "../models/Module";
import {RootState} from "../store";

const firstModule = new Module("Mein erstes Modul");
// Define the initial state using that type
const initialState: { [key: string]: Module } = {};
initialState[firstModule.id] = firstModule;

export const ModuleStateSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Module>) => {
            state[action.payload.id] = action.payload;
        },
        remove: (state, action: PayloadAction<Module>) => {
            delete state[action.payload.id];
        },
    },
})

// Action creators are generated for each case reducer function
export const { add, remove } = ModuleStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModules = (state: RootState) => state.modules

export default ModuleStateSlice.reducer