import {Weekday} from "../../models/Weekday";
import {AppointmentModel} from "../../models/AppointmentModel";
import styles from "./TimetableColumn.module.scss";
import {AppointmentVisualizerComponent} from "./AppointmentVisualizerComponent";
import {useContext} from "react";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";

type TimetableColumnProps = {
    weekday: Weekday;
    appointments: {[key: string]: AppointmentModel };
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
            <h2 className={styles.header}>{weekdayService.GetLabel(weekday)}</h2>
            <div className={styles.swimlane} style={{gridTemplateRows: "repeat(" + timeService.units.length + ", 7px)", gridTemplateColumns: "repeat(" + gridWidth + ", 1fr)"}}>
                {timeService.units.map((_, idx) =>
                    <div className={styles.unit} key={idx} style={{gridRow: idx+1, gridColumn: "1 / " + (gridWidth+1)}}></div>)}
                {Object.entries(coordinates).map(([key, coordinate], idx) => {
                    return (
                        <AppointmentVisualizerComponent key={idx}
                                                        appointment={appointments[key]}
                                                        coordinate={coordinate} />
                    )
                })}
            </div>
        </div>
    )
}

