import {FieldValues, useForm} from "react-hook-form";
import React from "react";
import Modal from "./Modal";
import {Info} from "../Info";
import {CheckBox} from "../form/CheckBox";
import {TextField} from "../form/TextField";
import {Form} from "../form/Form";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    onSubmit: (sectionFormData: SectionFormData) => void;
    onClose: () => void;
    startValues?: SectionFormData;
};

export type SectionFormData = {
    title: string;
    optional: boolean;
}

const defaultValues = {
    title: "",
    optional: false
}

export const SectionCreatorModal = ({onSubmit, onClose, startValues}: AppointmentCreatorProps) => {
    const {register, handleSubmit, formState: { errors, dirtyFields }, reset} = useForm({defaultValues, values: startValues});

    const processSubmit = (data: FieldValues) => {
        onSubmit({title: data.title, optional: data.optional});
        reset();
    };

    return (
        <Modal onClose={onClose} onSubmit={handleSubmit(processSubmit)} title={"Neuer Abschnitt"} edit={!!startValues}>
            <Form>
                <TextField register={register("title", {required: true})} caption="Name" error={errors.title} dirty={dirtyFields.title || !!startValues?.title}/>
                <CheckBox register={register("optional")}>
                    <div className="flex items-center content-start gap-s">
                        Flexible Veranstaltung?
                        <Info text="Alle Veranstaltungen unter diesem Abschnitt werden als Optionen für eine flexible Veranstaltung behandelt" />
                    </div>
                </CheckBox>
            </Form>
        </Modal>
    )
}