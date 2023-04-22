import {FieldValues, useForm} from "react-hook-form";
import React, {useCallback, useState} from "react";
import Modal from "./Modal";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";

type ModuleCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (moduleFormData: ModuleFormData) => void;
};

export type ModuleFormData = {
    title: string;
}

export const ModuleCreatorModal = ({submitCallback}: ModuleCreatorProps) => {
    const {register, handleSubmit} = useForm();
    const [show, setShow] = useState(false);

    const onSubmit = (data: FieldValues) => {
        submitCallback({title: data.title});
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
            <Button onClick={openModal}>Modul hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neues Modul"}>
                    <form className={formstyles.form}>
                        <div className={formstyles.input}>
                            <input className={formstyles.inputField} {...register("title")} type="text" />
                            <label className={formstyles.inputLabel}>
                                Name
                            </label>
                        </div>
                    </form>
                </Modal>
            )}
        </>


    )
}