import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ModuleModel} from "../models/ModuleModel";
import {RootState} from "../store";
import {SectionModel} from "../models/SectionModel";
import {AppointmentModel} from "../models/AppointmentModel";

// Define the initial state using that type
const initialState: ModuleState = { modules: {}, sections: {}, appointments: {} };

export const ModuleStateSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        addModule: (state, action: PayloadAction<ModuleModel>) => {
            state.modules[action.payload.id] = action.payload;
        },
        removeModule: (state, action: PayloadAction<ModuleModel>) => {
            delete state.modules[action.payload.id];
        },
        addSection: (state, action: PayloadAction<SectionModel>) => {
            state.modules[action.payload.moduleId].sections[action.payload.id] = action.payload;
            state.sections[action.payload.id] = action.payload;
        },
        removeSection: (state, action: PayloadAction<SectionModel>) => {
            delete state.modules[action.payload.moduleId].sections[action.payload.id];
            delete state.sections[action.payload.id];
        },
        addAppointment: (state, action: PayloadAction<AppointmentModel>) => {
            const section = state.sections[action.payload.sectionId];
            state.modules[section.moduleId].sections[section.id].appointments[action.payload.id] = action.payload;
            section.appointments[action.payload.id] = action.payload;
            state.appointments[action.payload.id] = action.payload;
        },
        removeAppointment: (state, action: PayloadAction<AppointmentModel>) => {
            const section = state.sections[action.payload.sectionId];
            delete state.modules[section.moduleId].sections[section.id].appointments[action.payload.id]
            delete state.sections[action.payload.sectionId].appointments[action.payload.id];
            delete state.appointments[action.payload.id];
        },
    },
})

type ModuleState = {
    modules: { [key: string]: ModuleModel };
    sections: { [key: string]: SectionModel };
    appointments: { [key: string]: AppointmentModel };
}

// Action creators are generated for each case reducer function
export const { addModule, removeModule, addSection, removeSection, addAppointment, removeAppointment } = ModuleStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModules = (state: RootState) => state.modules.modules;
export const selectSections = (state: RootState) => state.modules.sections;
export const selectAppointments = (state: RootState) => state.modules.appointments;

export default ModuleStateSlice.reducer