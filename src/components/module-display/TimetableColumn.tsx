import {Weekday} from "../../models/Weekday";
import {AppointmentModel} from "../../models/AppointmentModel";
import styles from "./TimetableColumn.module.scss";
import {AppointmentVisualizerComponent} from "./AppointmentVisualizerComponent";
import {useContext} from "react";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";

type TimetableColumnProps = {
    weekday: Weekday;
    appointments: AppointmentModel[];
}

export const TimetableColumn = ({weekday, appointments}: TimetableColumnProps) => {
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const emptySlots = timeService.GetEmptySlots(appointments);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{weekdayService.GetLabel(weekday)}</h2>
            <div className={styles.swimlane} style={{gridTemplateRows: "repeat(" + timeService.units.length + ", 7px)"}}>
                {emptySlots.map((idx) =>
                    <div className={styles.unit} key={idx} style={{gridRow: idx}}></div>)}
                {appointments.map((appointment, idx) => {
                    return (
                        <AppointmentVisualizerComponent key={idx}
                                                        appointment={appointment}
                                                        start={timeService.GetTimeUnitId(appointment.start)}
                                                        end={timeService.GetTimeUnitId(appointment.end)} />
                    )
                })}
            </div>
        </div>
    )
}

