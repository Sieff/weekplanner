import {FieldValues, useForm} from "react-hook-form";
import React from "react";
import Modal from "./Modal";
import {TextField} from "../form/TextField";
import {Form} from "../form/Form";

type ModuleCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    onSubmit: (moduleFormData: ModuleFormData) => void;
    onClose: () => void;
    startValues?: ModuleFormData;
};

export type ModuleFormData = {
    title: string;
}

const defaultValues = {
    title: "",
}

export const ModuleCreatorModal = ({onSubmit, onClose, startValues}: ModuleCreatorProps) => {
    const {register, handleSubmit, formState: { errors, dirtyFields } , reset} = useForm({defaultValues, values: startValues});

    const processSubmit = (data: FieldValues) => {
        onSubmit({title: data.title});
        reset();
    };

    return (
        <Modal onClose={onClose} onSubmit={handleSubmit(processSubmit)} title={!!startValues ? "Modul Bearbeiten" : "Neues Modul"} submitText={!!startValues ? "Speichern" : "Hinzufügen"}>
            <Form>
                <TextField register={register("title", {required: true})} caption="Name" error={errors.title} dirty={dirtyFields.title || !!startValues?.title}/>
            </Form>
        </Modal>
    )
}