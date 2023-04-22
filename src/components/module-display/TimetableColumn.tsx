import {Weekday} from "../../models/Weekday";
import {AppointmentModel} from "../../models/AppointmentModel";
import {WeekdayService} from "../../services/WeekdayService";
import styles from "./TimetableColumn.module.scss";
import {TimeService} from "../../services/TimeService";
import {TimeUnitComponent} from "./TimeUnitComponent";
import {useEffect, useRef} from "react";
import {AppointmentVisualizerComponent} from "./AppointmentVisualizerComponent";

type TimetableColumnProps = {
    weekday: Weekday;
    appointments: AppointmentModel[];
}

export const TimetableColumn = ({weekday, appointments}: TimetableColumnProps) => {
    const units = TimeService.GenerateTimeUnits();

    const unitsRef = useRef([] as (HTMLDivElement | undefined)[]);
    // you can access the elements with itemsRef.current[n]

    useEffect(() => {
        unitsRef.current = unitsRef.current.slice(0, units.length);
    }, [units]);


    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{WeekdayService.GetLabel(weekday)}</h2>
            <div className={styles.swimlane}>
                {units.map((unit, idx) =>
                    <div id={weekday + "-" + idx} className={styles.unit} ref={el => unitsRef.current[idx] = el || undefined} key={idx}><TimeUnitComponent unit={unit} /></div>)}
                {appointments.map((appointment, idx) => {
                    return (
                        <AppointmentVisualizerComponent key={idx}
                                                        appointment={appointment}
                                                        start={unitsRef.current[TimeService.GetTimeUnitId(appointment.start)]}
                                                        end={unitsRef.current[TimeService.GetTimeUnitId(appointment.end)]} />
                    )
                })}
            </div>
        </div>
    )
}

