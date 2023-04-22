import styles from "./AppointmentVisualizerComponent.module.scss";
import {AppointmentModel} from "../../models/AppointmentModel";

type AppointmentVisualizerComponentProps = {
    appointment: AppointmentModel;
    start?: HTMLDivElement;
    end?: HTMLDivElement;
}

export const AppointmentVisualizerComponent = ({appointment, start, end}: AppointmentVisualizerComponentProps) => {
    if (!start || !end) return <></>;

    const height = end.getBoundingClientRect().bottom - start.getBoundingClientRect().top

    return (
        <div className={styles.appointment} style={{top: start.getBoundingClientRect().top, height}}>
            <h3>{appointment.title}</h3>
        </div>
    )
}