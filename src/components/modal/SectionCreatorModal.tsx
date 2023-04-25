import {FieldValues, useForm} from "react-hook-form";
import React, {useState} from "react";
import {Button} from "../Button";
import Modal from "./Modal";
import {Info} from "../Info";
import {CheckBox} from "../form/CheckBox";
import {TextField} from "../form/TextField";
import {Form} from "../form/Form";

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

const defaultValues = {
    title: "",
    optional: false
}

export const SectionCreatorModal = ({submitCallback}: AppointmentCreatorProps) => {
    const {register, handleSubmit, formState: { errors, dirtyFields }, reset} = useForm({defaultValues});
    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const onSubmit = (data: FieldValues) => {
        submitCallback({title: data.title, optional: data.optional});
        closeModal();
        reset();
    };

    return (
        <>
            <Button onClick={openModal}>Abschnitt hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neuer Abschnitt"}>
                    <Form>
                        <TextField register={register("title", {required: true})} caption="Name" error={errors.title} dirty={dirtyFields.title}/>
                        <CheckBox register={register("optional")}>
                            <div className="flex items-center content-start gap-s">
                                Flexible Veranstaltung?
                                <Info text="Alle Veranstaltungen unter diesem Abschnitt werden als Optionen für eine flexible Veranstaltung behandelt" />
                            </div>
                        </CheckBox>
                    </Form>
                </Modal>
            )}
        </>


    )
}