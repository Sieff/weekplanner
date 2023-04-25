import {FieldValues, useForm} from "react-hook-form";
import React, {useState} from "react";
import {Button} from "../Button";
import Modal from "./Modal";
import {TextField} from "../form/TextField";
import {Form} from "../form/Form";

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
                    <Form>
                        <TextField register={register("title", {required: true})} caption="Name" error={errors.title} dirty={dirtyFields.title}/>
                    </Form>
                </Modal>
            )}
        </>


    )
}