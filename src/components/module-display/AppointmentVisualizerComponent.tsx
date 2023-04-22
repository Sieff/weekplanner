import styles from "./AppointmentVisualizerComponent.module.scss";
import {AppointmentModel} from "../../models/AppointmentModel";

type AppointmentVisualizerComponentProps = {
    appointment: AppointmentModel;
    start?: HTMLDivElement;
    end?: HTMLDivElement;
}

export const AppointmentVisualizerComponent = ({appointment, start, end}: AppointmentVisualizerComponentProps) => {
    if (!start || !end) return <></>;

    return (
        <div className={styles.appointment} style={{top: start.getBoundingClientRect().top}}>Moin</div>
    )
}