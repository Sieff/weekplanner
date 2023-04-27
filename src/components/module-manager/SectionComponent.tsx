import styles from "./SectionComponent.module.scss";
import {AppointmentCreatorModal, AppointmentFormData} from "../modal/AppointmentCreatorModal";
import {useDispatch} from "react-redux";
import {SectionModel} from "../../models/SectionModel";
import {addAppointment} from "../../state/ModulesStateSlice";
import {AppointmentComponent} from "./AppointmentComponent";
import {AppointmentModel} from "../../models/AppointmentModel";

type SectionComponentProps = {
    section: SectionModel;
}

export const SectionComponent = ({section}: SectionComponentProps) => {
    const dispatch = useDispatch()

    const onCreate = (appointmentData: AppointmentFormData) => {
        const newAppointment = new AppointmentModel(section.id, section.variant, appointmentData.title, appointmentData.weekday, appointmentData.start, appointmentData.end);
        dispatch(addAppointment(newAppointment));
    };

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <h3>{section.title}</h3>
                {section.optional && <div className={styles.option}> - flexibel</div>}
            </div>
            <div className={styles.appointmentField}>
                {Object.entries(section.appointments).map(([_, appointment]) => {
                    return (
                        <AppointmentComponent appointment={appointment} />
                    )}
                )}
            </div>
            <AppointmentCreatorModal submitCallback={onCreate} variant={section.variant} />
            <div className={styles.divider}></div>
        </div>
    )
}