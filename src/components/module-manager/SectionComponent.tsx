import styles from "./SectionComponent.module.scss";
import {AppointmentCreatorModal, AppointmentFormData} from "../modal/AppointmentCreatorModal";
import {useDispatch, useSelector} from "react-redux";
import {SectionModel} from "../../models/SectionModel";
import {addAppointment, selectAppointmentsBySection} from "../../state/ModulesStateSlice";
import {AppointmentComponent} from "./AppointmentComponent";
import {AppointmentModel} from "../../models/AppointmentModel";
import {Button} from "../Button";
import React from "react";
import {useComponentVisible} from "../../hooks/UseComponentVisible";

type SectionComponentProps = {
    section: SectionModel;
}

export const SectionComponent = ({section}: SectionComponentProps) => {
    const dispatch = useDispatch()
    const appointments = useSelector((state) => selectAppointmentsBySection(state, section.id));
    const { isComponentVisible, showComponent, hideComponent } = useComponentVisible(false);

    const onCreate = (appointmentData: AppointmentFormData) => {
        const newAppointment = new AppointmentModel(section.id, section.variant, appointmentData.title, appointmentData.weekday, appointmentData.start, appointmentData.end);
        dispatch(addAppointment(newAppointment));
        hideComponent();
    };

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <h3>{section.title}</h3>
                {section.optional && <div className={styles.option}> - flexibel</div>}
            </div>
            <div className={styles.appointmentField}>
                {appointments.map((appointment) => {
                    return (
                        <AppointmentComponent appointment={appointment} key={appointment.id} />
                    )}
                )}
            </div>
            <Button onClick={showComponent} variant={section.variant}>Veranstaltung hinzufügen</Button>
            {isComponentVisible && <AppointmentCreatorModal onSubmit={onCreate} onClose={hideComponent} />}
            <div className={styles.divider}></div>
        </div>
    )
}