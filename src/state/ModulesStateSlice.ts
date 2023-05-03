import {
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityState,
    PayloadAction
} from '@reduxjs/toolkit'
import {ModuleModel} from "../models/ModuleModel";
import {SectionModel} from "../models/SectionModel";
import {AppointmentModel} from "../models/AppointmentModel";
import {RootState} from "../store";
import {AppointmentFormData} from "../components/modal/AppointmentCreatorModal";
import {SectionFormData} from "../components/modal/SectionCreatorModal";

export const modulesAdapter = createEntityAdapter<ModuleModel>();
const sectionsAdapter = createEntityAdapter<SectionModel>();
const appointmentsAdapter = createEntityAdapter<AppointmentModel>();


// Define the initial state using that type
const initialState: ModuleState = {
    modules: modulesAdapter.getInitialState(),
    sections: sectionsAdapter.getInitialState(),
    appointments: appointmentsAdapter.getInitialState()
};

export const ModuleStateSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        addModule: (state, action: PayloadAction<ModuleModel>) => {
            modulesAdapter.addOne(state.modules as EntityState<ModuleModel>, action.payload);
        },
        removeModule: (state, action: PayloadAction<ModuleModel>) => {
            modulesAdapter.removeOne(state.modules as EntityState<ModuleModel>, action.payload.id);
        },
        addSection: (state, action: PayloadAction<SectionModel>) => {
            sectionsAdapter.addOne(state.sections as EntityState<SectionModel>, action.payload);
        },
        removeSection: (state, action: PayloadAction<SectionModel>) => {
            const appointments = Object.values(state.appointments.entities)
                .filter((appointment) => appointment?.sectionId === action.payload.id)
                .map((appointment) => appointment?.id as string);
            sectionsAdapter.removeOne(state.sections as EntityState<SectionModel>, action.payload.id);
            appointmentsAdapter.removeMany(state.appointments as EntityState<AppointmentModel>, appointments);
        },
        addAppointment: (state, action: PayloadAction<AppointmentModel>) => {
            appointmentsAdapter.addOne(state.appointments as EntityState<AppointmentModel>, action.payload);
        },
        removeAppointment: (state, action: PayloadAction<AppointmentModel>) => {
            appointmentsAdapter.removeOne(state.appointments as EntityState<AppointmentModel>, action.payload.id);
        },
        updateAppointmentsActive: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
            const newEntries = Object.entries(action.payload).map(([key, active]) => {
                const appointment = state.appointments.entities[key]!;
                appointment.active = active;
                return [key, appointment as AppointmentModel];
            });
            appointmentsAdapter.setMany(state.appointments as EntityState<AppointmentModel>, Object.fromEntries(newEntries));
        },
        updateAppointment: (state, action: PayloadAction<{data: AppointmentFormData, appointment: AppointmentModel}>) => {
            const appointment = state.appointments.entities[action.payload.appointment.id]!;
            appointment.title = action.payload.data.title;
            appointment.start = action.payload.data.start;
            appointment.end = action.payload.data.end;
            appointment.weekday = action.payload.data.weekday;
            appointmentsAdapter.setOne(state.appointments as EntityState<AppointmentModel>, appointment as AppointmentModel);
        },
        updateSection: (state, action: PayloadAction<{data: SectionFormData, section: SectionModel}>) => {
            const section = state.sections.entities[action.payload.section.id]!;
            section.title = action.payload.data.title;
            section.optional = action.payload.data.optional;
            sectionsAdapter.setOne(state.sections as EntityState<SectionModel>, section as SectionModel);
        },
    },
});

export type ModuleState = {
    modules: EntityState<ModuleModel>;
    sections: EntityState<SectionModel>;
    appointments: EntityState<AppointmentModel>;
}

// Action creators are generated for each case reducer function
export const { addModule, removeModule, addSection, removeSection, addAppointment, removeAppointment, updateAppointmentsActive, updateAppointment, updateSection } = ModuleStateSlice.actions

export const {
    selectAll: selectModules,
    // Pass in a selector that returns the posts slice of state
} = modulesAdapter.getSelectors<RootState>((state) => state.modules.modules);

export const {
    selectAll: selectSections,
    // Pass in a selector that returns the posts slice of state
} = sectionsAdapter.getSelectors<RootState>((state) => state.modules.sections);

export const selectSectionsByModule = createSelector(
    [selectSections, (state, moduleId) => moduleId],
    (sections, moduleId) => sections.filter(section => section.moduleId === moduleId)
);

export const {
    selectAll: selectAppointments
    // Pass in a selector that returns the posts slice of state
} = appointmentsAdapter.getSelectors<RootState>((state) => state.modules.appointments);

export const selectAppointmentsBySection = createSelector(
    [selectAppointments, (state, sectionId) => sectionId],
    (appointments, sectionId) => appointments.filter(appointment => appointment.sectionId === sectionId)
);

export default ModuleStateSlice.reducer