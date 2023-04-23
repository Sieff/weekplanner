import styles from "./AppointmentVisualizerComponent.module.scss";
import {AppointmentModel} from "../../models/AppointmentModel";

type AppointmentVisualizerComponentProps = {
    appointment: AppointmentModel;
    start: number;
    end: number;
}

export const AppointmentVisualizerComponent = ({appointment, start, end}: AppointmentVisualizerComponentProps) => {
    return (
        <div className={styles.appointment} style={{gridRowStart: start, gridRowEnd: end}}>
            <h3>{appointment.title}</h3>
        </div>
    )
}