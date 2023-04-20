import {FixedAppointmentModel} from "../models/appointment/FixedAppointmentModel";
import styles from "./FixedAppointment.module.scss";
import {TimeService} from "../services/TimeService";
import {WeekdayService} from "../services/WeekdayService";

type FixedAppointmentProps = {
    appointment: FixedAppointmentModel;
}

export const FixedAppointment = ({appointment}: FixedAppointmentProps) => {
    console.log(appointment);
    return (
        <div className={styles.appointment}>
            <p>
                {appointment.title}
            </p>
            <div>
                {TimeService.Render(appointment.start) + " - " + TimeService.Render(appointment.end)}
            </div>
            {WeekdayService.GetLabel(appointment.weekday)}
        </div>
    )
}