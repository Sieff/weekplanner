import {Weekday} from "../../models/Weekday";
import {AppointmentModel} from "../../models/AppointmentModel";
import {WeekdayService} from "../../services/WeekdayService";
import styles from "./TimetableColumn.module.scss";
import {TimeService} from "../../services/TimeService";
import {AppointmentVisualizerComponent} from "./AppointmentVisualizerComponent";

type TimetableColumnProps = {
    weekday: Weekday;
    appointments: AppointmentModel[];
}

export const TimetableColumn = ({weekday, appointments}: TimetableColumnProps) => {
    const units = TimeService.GenerateTimeUnits();
    const emptySlots = TimeService.GetEmptySlots(appointments, units.length);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{WeekdayService.GetLabel(weekday)}</h2>
            <div className={styles.swimlane} style={{gridTemplateRows: "repeat(" + units.length + ", 7px)"}}>
                {appointments.map((appointment, idx) => {
                    return (
                        <AppointmentVisualizerComponent key={idx}
                                                        appointment={appointment}
                                                        start={TimeService.GetTimeUnitId(appointment.start)}
                                                        end={TimeService.GetTimeUnitId(appointment.end)} />
                    )
                })}
                {emptySlots.map((idx) =>
                    <div className={styles.unit} key={idx} style={{gridRow: idx}}></div>)}
            </div>
        </div>
    )
}

