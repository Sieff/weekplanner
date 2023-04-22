import styles from "./AppointmentCreatorModal.module.scss";
import {FieldValues, useForm} from "react-hook-form";
import {WeekdayService} from "../../services/WeekdayService";
import React, {useCallback, useState} from "react";
import {TimeService} from "../../services/TimeService";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";
import {Moment} from "moment";
import {Weekday} from "../../models/Weekday";
import Modal from "./Modal";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (appointment: AppointmentFormData) => void;
};

export type AppointmentFormData = {
    title: string;
    start: Moment;
    end: Moment;
    weekday: Weekday;
}

export const AppointmentCreatorModal = ({submitCallback}: AppointmentCreatorProps) => {
    const {register, handleSubmit} = useForm();
    const [show, setShow] = useState(false);


    const onSubmit = (data: FieldValues) => {
        const start = TimeService.ParseTime(data.start);
        const end = TimeService.ParseTime(data.end);
        submitCallback({title: data.title, start, end, weekday: data.weekday});
    };

    const openModal = useCallback(
        () => {
            setShow(true)
        },
        [],
    );

    const closeModal = useCallback(
        () => {
            setShow(false)
        },
        [],
    );


    return (
        <>
            <Button onClick={openModal}>Veranstaltung hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neue Veranstaltung"}>
                    <form className={formstyles.form}>
                        <div className={formstyles.input}>
                            <input className={formstyles.inputField} {...register("title")} type="text" />
                            <label className={formstyles.inputLabel}>
                                Name
                            </label>
                        </div>
                        <div className={styles.timeRow}>
                            <div className={formstyles.input}>
                                <input className={formstyles.inputField} {...register("start")} type="time" step="900" min="07:00" max="23:00" />
                                <label className={formstyles.inputLabel}>
                                    Startzeit
                                </label>
                            </div>
                            <div className={formstyles.input}>
                                <input className={formstyles.inputField} {...register("end")} type="time" />
                                <label className={formstyles.inputLabel}>
                                    Endzeit
                                </label>
                            </div>
                        </div>
                        <div className={formstyles.input}>
                            <select className={formstyles.inputField} {...register("weekday")}>
                                {WeekdayService.AllWeekdays().map(weekday => {
                                    return (
                                        <option value={weekday} key={weekday}>
                                            {WeekdayService.GetLabel(weekday)}
                                        </option>
                                    )
                                })}
                            </select>
                            <label className={formstyles.inputLabel}>
                                Wochentag
                            </label>
                        </div>
                    </form>
                </Modal>
            )}
        </>


    )
}