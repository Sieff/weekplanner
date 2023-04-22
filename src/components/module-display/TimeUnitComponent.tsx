import {TimeUnitModel} from "../../models/TimeUnitModel";
import styles from "./TimeUnitComponent.module.scss";

type TimeUnitComponentProps = {
    unit: TimeUnitModel
}

export const TimeUnitComponent = ({unit}: TimeUnitComponentProps) => {
    return (
        <div className={styles.unit}>
        </div>
    )
}