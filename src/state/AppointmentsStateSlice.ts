import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {SingleAppointmentModel} from "../models/appointment/SingleAppointmentModel";
import {AppointmentModel} from "../models/appointment/AppointmentModel";
import {OptionalAppointmentModel} from "../models/appointment/OptionalAppointmentModel";

// Define the initial state using that type
const initialState: { [key: string]: AppointmentModel } = {};

export const AppointmentsStateSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        addSingle: (state, action: PayloadAction<SingleAppointmentModel>) => {
            const appointment = action.payload;
            state[appointment.id] = appointment;
        },
        addOptional: (state, action: PayloadAction<AddOptionalAppointmentPayload>) => {
            const appointment = action.payload.appointment;

            let existingAppointment: AppointmentModel = state[appointment.id];
            if (existingAppointment instanceof SingleAppointmentModel) {
                existingAppointment = OptionalAppointmentModel.from(existingAppointment)
            }

            state[appointment.id] = existingAppointment;
            (state[appointment.id] as OptionalAppointmentModel).options[action.payload.newAppointment.id] = action.payload.newAppointment;
        }
    },
})

type AddOptionalAppointmentPayload = {
    appointment: AppointmentModel;
    newAppointment: SingleAppointmentModel;
}

// Action creators are generated for each case reducer function
export const { addSingle, addOptional } = AppointmentsStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAppointments = (state: RootState) => state.appointments

export default AppointmentsStateSlice.reducer