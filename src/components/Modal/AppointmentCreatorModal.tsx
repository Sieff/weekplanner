import styles from "./AppointmentCreatorModal.module.scss";
import {FieldValues, useForm} from "react-hook-form";
import {WeekdayService} from "../../services/WeekdayService";
import React, {useCallback, useState} from "react";
import {TimeService} from "../../services/TimeService";
import {SingleAppointmentModel} from "../../models/appointment/SingleAppointmentModel";
import Modal from "./Modal";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (appointment: SingleAppointmentModel) => void;
};

export const AppointmentCreatorModal = ({submitCallback}: AppointmentCreatorProps) => {
    const {register, handleSubmit} = useForm();
    const [show, setShow] = useState(false);


    const onSubmit = (data: FieldValues) => {
        const start = TimeService.ParseTime(data.start);
        const end = TimeService.ParseTime(data.end);
        submitCallback(new SingleAppointmentModel(data.name, data.weekday, start, end));
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
            <Button onClick={openModal}>+</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neue Veranstaltung"}>
                    <div className={styles.box}>
                        <form className={formstyles.form}>
                            <div className={formstyles.input}>
                                <input className={formstyles.inputField} {...register("name")} type="text" />
                                <label className={formstyles.inputLabel}>
                                    Name
                                </label>
                            </div>
                            <div className={styles.timeRow}>
                                <div className={formstyles.input}>
                                    <input className={formstyles.inputField} {...register("start")} type="time" />
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
                                    {WeekdayService.Instance().AllWeekdays().map(weekday => {
                                        return (
                                            <option value={weekday} key={weekday}>
                                                {WeekdayService.Instance().GetLabel(weekday)}
                                            </option>
                                        )
                                    })}
                                </select>
                                <label className={formstyles.inputLabel}>
                                    Wochentag
                                </label>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>


    )
}