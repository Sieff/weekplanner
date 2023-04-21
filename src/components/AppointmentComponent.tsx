import {SingleAppointmentModel} from "../models/appointment/SingleAppointmentModel";
import styles from "./AppointmentComponent.module.scss";
import {TimeService} from "../services/TimeService";
import {WeekdayService} from "../services/WeekdayService";
import {AppointmentModel} from "../models/appointment/AppointmentModel";
import {OptionalAppointmentModel} from "../models/appointment/OptionalAppointmentModel";

type AppointmentComponentProps = {
    appointment: AppointmentModel;
}

export const AppointmentComponent = ({appointment}: AppointmentComponentProps) => {
    const hasOptions = appointment instanceof OptionalAppointmentModel;

    return (
        <div className={styles.appointmentField}>
            {hasOptions && (appointment as OptionalAppointmentModel).options.map((appointment) => {
                return (
                    <SingleAppointment appointment={appointment} />
                )
            })}
            {!hasOptions && (
                <SingleAppointment appointment={appointment as SingleAppointmentModel} />
            )}
        </div>
    )
}

type SingleAppointmentProps = {
    appointment: SingleAppointmentModel;
}

const SingleAppointment = ({appointment}: SingleAppointmentProps) => {
    const weekday = WeekdayService.Instance().GetLabel(appointment.weekday);
    console.log(weekday);
    return (
        <div className={styles.appointment}>
            <p>
                {appointment.title}
            </p>
            <div>
                {TimeService.Render(appointment.start) + " - " + TimeService.Render(appointment.end)}
            </div>
            <div>
                {weekday}
            </div>
        </div>
    )
}