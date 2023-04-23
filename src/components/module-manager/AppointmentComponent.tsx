import {AppointmentModel} from "../../models/AppointmentModel";
import styles from "./AppointmentComponent.module.scss";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";
import {useContext} from "react";

type SingleAppointmentProps = {
    appointment: AppointmentModel;
}

export const AppointmentComponent = ({appointment}: SingleAppointmentProps) => {
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const weekday = weekdayService.GetLabel(appointment.weekday);

    return (
        <div className={styles.appointment}>
            <h3>{appointment.title}</h3>
            <div>
                {weekday}
            </div>
            <div>
                {timeService.Render(appointment.start) + " - " + timeService.Render(appointment.end)}
            </div>
        </div>
    )
}