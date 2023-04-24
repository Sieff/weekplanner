import styles from "./AppointmentCreatorModal.module.scss";
import {FieldValues, useForm} from "react-hook-form";
import React, {useContext, useState} from "react";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";
import {Moment} from "moment";
import {Weekday} from "../../models/Weekday";
import Modal from "./Modal";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";
import {cls} from "../../styles/cls";

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

const defaultValues = {
    title: "",
    start: "",
    end: "",
    weekday: ""
}

export const AppointmentCreatorModal = ({submitCallback}: AppointmentCreatorProps) => {
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const {register, handleSubmit, formState: { errors, dirtyFields }, reset} = useForm({ defaultValues: defaultValues });
    const [show, setShow] = useState(false);

    const validateTimes = (value: string, formValues: FieldValues) => {
        const start = timeService.ParseTime(formValues.start);
        const end = timeService.ParseTime(formValues.end);
        return start < end
    }

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const onSubmit = (data: FieldValues) => {
        const start = timeService.ParseTime(data.start);
        const end = timeService.ParseTime(data.end);
        submitCallback({title: data.title, start, end, weekday: data.weekday});
        closeModal();
        reset();
    };

    return (
        <>
            <Button onClick={openModal}>Veranstaltung hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neue Veranstaltung"}>
                    <form className={formstyles.form}>
                        <div className={formstyles.input}>
                            <input className={cls(formstyles.inputField, errors.title && formstyles.inputFieldInvalid, dirtyFields.title && formstyles.inputFieldValid)}
                                   {...register("title", {required: true, minLength: 1})}
                                   type="text" />
                            <label className={formstyles.inputLabel}>
                                Name
                            </label>
                        </div>
                        <div className={styles.timeRow}>
                            <div className={formstyles.input}>
                                <input className={cls(formstyles.inputField, errors.start && formstyles.inputFieldInvalid, dirtyFields.start && formstyles.inputFieldValid)}
                                       {...register("start", {required: true, validate: validateTimes})}
                                       type="time" step="900" min="07:00" max="23:00" />
                                <label className={cls(formstyles.inputLabel, styles.timeInput)}>
                                    Startzeit
                                </label>
                            </div>
                            <div className={formstyles.input}>
                                <input className={cls(formstyles.inputField, errors.end && formstyles.inputFieldInvalid, dirtyFields.end && formstyles.inputFieldValid)}
                                       {...register("end", {required: true, validate: validateTimes})}
                                       type="time" />
                                <label className={cls(formstyles.inputLabel, styles.timeInput)}>
                                    Endzeit
                                </label>
                            </div>
                        </div>
                        <div className={formstyles.input}>
                            <select className={cls(formstyles.inputField, errors.weekday && formstyles.inputFieldInvalid, dirtyFields.weekday && formstyles.inputFieldValid)}
                                    {...register("weekday", {required: true})}>
                                {weekdayService.AllWeekdays().map(weekday => {
                                    return (
                                        <option value={weekday} key={weekday}>
                                            {weekdayService.GetLabel(weekday)}
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