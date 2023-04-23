import {FieldValues, useForm} from "react-hook-form";
import React, {useCallback, useState} from "react";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";
import Modal from "./Modal";
import {cls} from "../../styles/cls";
import {Info} from "../Info";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (sectionFormData: SectionFormData) => void;
};

export type SectionFormData = {
    title: string;
    optional: boolean;
}

export const SectionCreatorModal = ({submitCallback}: AppointmentCreatorProps) => {
    const {register, handleSubmit} = useForm();
    const [show, setShow] = useState(false);

    const onSubmit = (data: FieldValues) => {
        submitCallback({title: data.title, optional: data.optional});
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
            <Button onClick={openModal}>Abschnitt hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neuer Abschnitt"}>
                    <form className={formstyles.form}>
                        <div className={formstyles.input}>
                            <input className={formstyles.inputField} {...register("title")} type="text" />
                            <label className={formstyles.inputLabel}>
                                Name
                            </label>
                        </div>
                        <div className={formstyles.input}>
                            <input {...register("optional")} className={cls(formstyles.inpCbx, formstyles.inputField)} id="cbx" type="checkbox" style={{display: "none"}}/>
                            <label className={cls(formstyles.cbx, formstyles.inputLabel)} htmlFor="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Optionale Veranstaltungen?</span>
                                <Info text="Alle Veranstaltungen unter diesem Abschnitt werden als Optionen für eine Veranstaltung behandelt." />
                            </label>
                        </div>
                    </form>
                </Modal>
            )}
        </>


    )
}