import styles from "./HourColumn.module.scss";
import {TimeService} from "../../services/TimeService";

export const HourColumn = () => {
    const hours = TimeService.GenerateHours();

    return (
        <div className={styles.container}>
            <h2 className={styles.centering}>Uhrzeit</h2>
            <div className={styles.lane}>
                {hours.map((hour, idx) =>
                    <div key={idx} className={styles.centering}>{TimeService.Render(hour)}</div>)}
            </div>
        </div>
    )
}

