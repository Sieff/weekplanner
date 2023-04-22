import {FieldValues, useForm} from "react-hook-form";
import React, {useCallback, useState} from "react";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";
import Modal from "./Modal";

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
                        <input type="checkbox" />
                        <input className={formstyles.inputField} {...register("optional")} type="checkbox" />
                        <div className={formstyles.input}>
                            <input {...register("optional")} type="checkbox" />
                            <label className={formstyles.inputLabel}>
                                Optional?
                            </label>
                        </div>
                    </form>
                </Modal>
            )}
        </>


    )
}