import styles from "./HourColumn.module.scss";
import {useContext} from "react";
import {TimeServiceContext} from "../../services/ServiceProvider";

export const HourColumn = () => {
    const timeService = useContext(TimeServiceContext);
    const hours = timeService.GenerateHours();

    return (
        <div className={styles.container}>
            <h2 className={styles.centering}>Uhrzeit</h2>
            <div className={styles.lane}>
                {hours.map((hour, idx) =>
                    <div key={idx} className={styles.centering}>{timeService.Render(hour)}</div>)}
            </div>
        </div>
    )
}

