import {SingleAppointmentModel} from "../models/appointment/SingleAppointmentModel";
import styles from "./AppointmentComponent.module.scss";
import {TimeService} from "../services/TimeService";
import {WeekdayService} from "../services/WeekdayService";
import {AppointmentModel} from "../models/appointment/AppointmentModel";
import {OptionalAppointmentModel} from "../models/appointment/OptionalAppointmentModel";
import {AppointmentCreatorModal, AppointmentFormData} from "./Modal/AppointmentCreatorModal";
import {useDispatch} from "react-redux";
import {addOptional} from "../state/AppointmentsStateSlice";

type AppointmentComponentProps = {
    appointment: AppointmentModel;
}

export const AppointmentComponent = ({appointment}: AppointmentComponentProps) => {
    const hasOptions = appointment instanceof OptionalAppointmentModel;

    const dispatch = useDispatch()

    const onCreate = (appointmentData: AppointmentFormData) => {
        const newAppointment = new SingleAppointmentModel(appointment.moduleId, appointmentData.name, appointmentData.weekday, appointmentData.start, appointmentData.end);
        dispatch(addOptional({appointment, newAppointment}));
    };

    return (
        <div className={styles.section}>
            {hasOptions && (
                <>
                    <h3>{appointment.title}</h3>
                    <div className={styles.appointmentField}>
                        {Object.entries((appointment as OptionalAppointmentModel).options).map(([_, appointment]) => {
                            return (
                                <SingleAppointment appointment={appointment} />
                            )}
                        )}
                    </div>
                </>
            )}
            {!hasOptions && (
                <SingleAppointment appointment={appointment as SingleAppointmentModel} />
            )}
            <AppointmentCreatorModal submitCallback={onCreate} />
        </div>
    )
}

type SingleAppointmentProps = {
    appointment: SingleAppointmentModel;
}

const SingleAppointment = ({appointment}: SingleAppointmentProps) => {
    const weekday = WeekdayService.Instance().GetLabel(appointment.weekday);

    return (
        <div className={styles.appointment}>
            <h3>{appointment.title}</h3>
            <div>
                {weekday}
            </div>
            <div>
                {TimeService.Render(appointment.start) + " - " + TimeService.Render(appointment.end)}
            </div>
        </div>
    )
}