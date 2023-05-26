import {
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityState,
    PayloadAction
} from '@reduxjs/toolkit'
import {ModuleModel, ModuleModelData} from "../models/ModuleModel";
import {SectionModel, SectionModelData} from "../models/SectionModel";
import {AppointmentModel, AppointmentModelData} from "../models/AppointmentModel";
import {RootState} from "../store";
import {AppointmentFormData} from "../components/modal/AppointmentCreatorModal";
import {SectionFormData} from "../components/modal/SectionCreatorModal";
import {ModuleFormData} from "../components/modal/ModuleCreatorModal";

export const modulesAdapter = createEntityAdapter<ModuleModelData>();
const sectionsAdapter = createEntityAdapter<SectionModelData>();
const appointmentsAdapter = createEntityAdapter<AppointmentModelData>();


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
            modulesAdapter.addOne(state.modules as EntityState<ModuleModelData>, action.payload.asData());
        },
        removeModule: (state, action: PayloadAction<ModuleModel>) => {
            const sections = Object.values(state.sections.entities)
                .filter((section) => section?.moduleId === action.payload.id)
                .map((section) => section?.id as string);
            sectionsAdapter.removeMany(state.sections as EntityState<SectionModelData>, sections);

            const appointments = Object.values(state.appointments.entities)
                .filter((appointment) => sections.some((sectionId) => appointment?.sectionId === sectionId))
                .map((appointment) => appointment?.id as string);
            appointmentsAdapter.removeMany(state.appointments as EntityState<AppointmentModelData>, appointments);

            modulesAdapter.removeOne(state.modules as EntityState<ModuleModelData>, action.payload.id);
        },
        addSection: (state, action: PayloadAction<SectionModel>) => {
            sectionsAdapter.addOne(state.sections as EntityState<SectionModelData>, action.payload.asData());
        },
        removeSection: (state, action: PayloadAction<SectionModel>) => {
            const appointments = Object.values(state.appointments.entities)
                .filter((appointment) => appointment?.sectionId === action.payload.id)
                .map((appointment) => appointment?.id as string);
            sectionsAdapter.removeOne(state.sections as EntityState<SectionModelData>, action.payload.id);
            appointmentsAdapter.removeMany(state.appointments as EntityState<AppointmentModelData>, appointments);
        },
        addAppointment: (state, action: PayloadAction<AppointmentModel>) => {
            appointmentsAdapter.addOne(state.appointments as EntityState<AppointmentModelData>, action.payload.asData());
        },
        removeAppointment: (state, action: PayloadAction<AppointmentModel>) => {
            appointmentsAdapter.removeOne(state.appointments as EntityState<AppointmentModelData>, action.payload.id);
        },
        removeAll: (state) => {
            modulesAdapter.removeAll(state.modules as EntityState<ModuleModelData>);
            sectionsAdapter.removeAll(state.sections as EntityState<SectionModelData>);
            appointmentsAdapter.removeAll(state.appointments as EntityState<AppointmentModelData>);
        },
        updateAppointmentsActive: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
            //TODO: bug
            const newEntries = Object.entries(action.payload).map(([key, active]) => {
                const appointment = state.appointments.entities[key]!;
                appointment.active = active;
                return [key, appointment as AppointmentModelData];
            });
            appointmentsAdapter.setMany(state.appointments as EntityState<AppointmentModelData>, Object.fromEntries(newEntries));
        },
        updateAppointment: (state, action: PayloadAction<{data: AppointmentFormData, appointment: AppointmentModel}>) => {
            const appointment = state.appointments.entities[action.payload.appointment.id]!;
            appointment.title = action.payload.data.title;
            appointment.start = action.payload.data.start.format('HH:mm');
            appointment.end = action.payload.data.end.format('HH:mm');
            appointment.weekday = action.payload.data.weekday;
            appointmentsAdapter.setOne(state.appointments as EntityState<AppointmentModelData>, appointment as AppointmentModelData);
        },
        updateSection: (state, action: PayloadAction<{data: SectionFormData, section: SectionModel}>) => {
            const section = state.sections.entities[action.payload.section.id]!;
            section.title = action.payload.data.title;
            section.optional = action.payload.data.optional;
            sectionsAdapter.setOne(state.sections as EntityState<SectionModelData>, section as SectionModelData);
        },
        updateModule: (state, action: PayloadAction<{data: ModuleFormData, module: ModuleModel}>) => {
            const module = state.modules.entities[action.payload.module.id]!;
            module.title = action.payload.data.title;
            modulesAdapter.setOne(state.modules as EntityState<ModuleModelData>, module as ModuleModelData);
        },
    },
});

export type ModuleState = {
    modules: EntityState<ModuleModelData>;
    sections: EntityState<SectionModelData>;
    appointments: EntityState<AppointmentModelData>;
}

// Action creators are generated for each case reducer function
export const {
    addModule,
    removeModule,
    addSection,
    removeSection,
    addAppointment,
    removeAppointment,
    removeAll,
    updateAppointmentsActive,
    updateAppointment,
    updateSection,
    updateModule
} = ModuleStateSlice.actions

export const {
    selectAll: selectModuleData,
    // Pass in a selector that returns the posts slice of state
} = modulesAdapter.getSelectors<RootState>((state) => state.modules.modules);

export const selectModules = createSelector(
    [selectModuleData],
    (modules) => modules.map((moduleData) => ModuleModel.from(moduleData))
);

export const {
    selectAll: selectSectionData,
    // Pass in a selector that returns the posts slice of state
} = sectionsAdapter.getSelectors<RootState>((state) => state.modules.sections);

export const selectSections = createSelector(
    [selectSectionData],
    (sections) => sections.map((sectionData) => SectionModel.from(sectionData))
);
export const selectSectionsByModule = createSelector(
    [selectSections, (state, moduleId) => moduleId],
    (sections, moduleId) => sections.filter(section => section.moduleId === moduleId)
);

export const {
    selectAll: selectAppointmentData
    // Pass in a selector that returns the posts slice of state
} = appointmentsAdapter.getSelectors<RootState>((state) => state.modules.appointments);

export const selectAppointments = createSelector(
    [selectAppointmentData],
    (appointments) => appointments.map((appointmentData) => AppointmentModel.from(appointmentData))
);

export const selectAppointmentsBySection = createSelector(
    [selectAppointments, (state, sectionId) => sectionId],
    (appointments, sectionId) => appointments.filter(appointment => appointment.sectionId === sectionId)
);

export default ModuleStateSlice.reducer