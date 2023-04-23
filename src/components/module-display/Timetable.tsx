import {useSelector} from "react-redux";
import {selectAppointments} from "../../state/ModulesStateSlice";
import {AppointmentModel} from "../../models/AppointmentModel";
import {TimetableColumn} from "./TimetableColumn";
import styles from "./Timetable.module.scss";
import {HourColumn} from "./HourColumn";
import {useContext} from "react";
import {WeekdayServiceContext} from "../../services/ServiceProvider";

export const Timetable = () => {
    const weekdayService = useContext(WeekdayServiceContext);

    const appointmentsDict = useSelector(selectAppointments);
    const appointments: AppointmentModel[] = Object.values(appointmentsDict);

    return (
        <div className={styles.timetable}>
            <HourColumn />
            {weekdayService.AllWeekdays().map((weekday) => {
                return <TimetableColumn weekday={weekday}
                                        appointments={appointments.filter((appointment) => appointment.weekday === weekday)}
                                        key={weekday} />
            })}
        </div>
    )
}