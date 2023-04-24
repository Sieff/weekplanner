import {FieldValues, useForm} from "react-hook-form";
import React, {useState} from "react";
import formstyles from "../../styles/formstyles.module.scss"
import {Button} from "../Button";
import Modal from "./Modal";
import {cls} from "../../styles/cls";

type ModuleCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (moduleFormData: ModuleFormData) => void;
};

export type ModuleFormData = {
    title: string;
}

const defaultValues = {
    title: "",
}

export const ModuleCreatorModal = ({submitCallback}: ModuleCreatorProps) => {
    const {register, handleSubmit, formState: { errors, dirtyFields } , reset} = useForm({defaultValues});
    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const onSubmit = (data: FieldValues) => {
        submitCallback({title: data.title});
        closeModal();
        reset();
    };


    return (
        <>
            <Button onClick={openModal}>Modul hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neues Modul"}>
                    <form className={formstyles.form}>
                        <div className={formstyles.input}>
                            <input className={cls(formstyles.inputField, errors.title && formstyles.inputFieldInvalid, dirtyFields.title && formstyles.inputFieldValid)}
                                   {...register("title", {required: true})} type="text" />
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