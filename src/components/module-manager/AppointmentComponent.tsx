import {AppointmentModel} from "../../models/AppointmentModel";
import {WeekdayService} from "../../services/WeekdayService";
import styles from "./AppointmentComponent.module.scss";
import {TimeService} from "../../services/TimeService";

type SingleAppointmentProps = {
    appointment: AppointmentModel;
}

export const AppointmentComponent = ({appointment}: SingleAppointmentProps) => {
    const weekday = WeekdayService.GetLabel(appointment.weekday);

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