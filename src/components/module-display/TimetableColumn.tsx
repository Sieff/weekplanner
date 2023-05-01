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

export type TimeTableCoordinates = {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
}

export const TimetableColumn = ({weekday, appointments}: TimetableColumnProps) => {
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const [coordinates, gridWidth] = timeService.GenerateCoordinates(appointments);

    return (
        <div className={styles.container}>
            <h2 className={"flex justify-center px-s"}>{weekdayService.GetLabel(weekday)}</h2>
            <div className={"grid border-l-2 border-divider"} style={{gridTemplateRows: "repeat(" + timeService.units.length + ", 7px)", gridTemplateColumns: "repeat(" + gridWidth + ", 1fr)"}}>
                {timeService.units.map((_, idx) =>
                    <div className={"h-0.5"} key={idx} style={{gridRow: idx+1, gridColumn: "1 / " + (gridWidth+1)}}></div>)}
                {appointments.map((appointment, idx) => {
                    return (
                        <AppointmentVisualizerComponent key={idx}
                                                        appointment={appointment}
                                                        coordinate={coordinates[appointment.id]} />
                    )
                })}
            </div>
        </div>
    )
}

