import {useSelector} from "react-redux";
import {selectAppointments} from "../../state/ModulesStateSlice";
import {WeekdayService} from "../../services/WeekdayService";
import {AppointmentModel} from "../../models/AppointmentModel";
import {TimetableColumn} from "./TimetableColumn";
import styles from "./Timetable.module.scss";
import {HourColumn} from "./HourColumn";

export const Timetable = () => {
    const appointmentsDict = useSelector(selectAppointments);
    const appointments: AppointmentModel[] = Object.values(appointmentsDict);

    return (
        <div className={styles.timetable}>
            <HourColumn />
            {WeekdayService.AllWeekdays().map((weekday) => {
                return <TimetableColumn weekday={weekday}
                                        appointments={appointments.filter((appointment) => appointment.weekday === weekday)}
                                        key={weekday} />
            })}
        </div>
    )
}