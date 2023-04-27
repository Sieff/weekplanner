import {FieldValues, useForm} from "react-hook-form";
import React, {useCallback, useContext, useState} from "react";
import {Button} from "../Button";
import {Moment} from "moment";
import {Weekday} from "../../models/Weekday";
import Modal from "./Modal";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";
import {TextField} from "../form/TextField";
import {DropDown} from "../form/DropDown";
import {TimeChooser} from "../form/TimeChooser";
import {Form} from "../form/Form";
import {ColorVariant} from "../../models/Variant";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (appointment: AppointmentFormData) => void;
    variant: ColorVariant;
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

export const AppointmentCreatorModal = ({submitCallback, variant}: AppointmentCreatorProps) => {
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const {register, handleSubmit, clearErrors, setError, formState: { errors, dirtyFields }, reset} = useForm({ defaultValues: defaultValues });
    const [show, setShow] = useState(false);

    const validateTimes = (value: string, formValues: FieldValues) => {
        if (formValues.start === "" || formValues.end === "") {
            return value !== "";
        }

        const start = timeService.ParseTime(formValues.start);
        const end = timeService.ParseTime(formValues.end);

        if (start < end) {
            clearErrors("start");
            clearErrors("end");
        } else {
            setError("start", { type: 'Time Error', message: '> Endzeit' });
            setError("end", { type: 'Time Error', message: '< Startzeit' });
        }

        return start < end;
    };


    const labelFunction = useCallback(
        (weekday: Weekday) => {
            return weekdayService.GetLabel(weekday);
        },
        [weekdayService],
    );

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
            <Button onClick={openModal} variant={variant}>Veranstaltung hinzufügen</Button>
            {show && (
                <Modal onClose={closeModal} onSubmit={handleSubmit(onSubmit)} title={"Neue Veranstaltung"}>
                    <Form>
                        <TextField register={register("title", {required: true})} caption="Name" error={errors.title} dirty={dirtyFields.title}/>
                        <div className="w-full flex content-between gap-m">
                            <TimeChooser register={register("start", {required: true, validate: validateTimes})}
                                         caption="Startzeit"
                                         dirty={dirtyFields.start}
                                         error={errors.start} />
                            <TimeChooser register={register("end", {required: true, validate: validateTimes})}
                                         caption="Endzeit"
                                         dirty={dirtyFields.end}
                                         error={errors.end} />
                        </div>
                        <DropDown register={register("weekday", {required: true})}
                                  options={weekdayService.AllWeekdays()}
                                  labelFunction={labelFunction}
                                  error={errors.weekday}
                                  dirty={dirtyFields.weekday}
                                  caption="Wochentag" />
                    </Form>
                </Modal>
            )}
        </>


    )
}