import {FieldValues, useForm} from "react-hook-form";
import React, {useCallback, useContext} from "react";
import {Moment} from "moment";
import {Weekday} from "../../models/Weekday";
import Modal from "./Modal";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";
import {TextField} from "../form/TextField";
import {DropDown} from "../form/DropDown";
import {TimeChooser} from "../form/TimeChooser";
import {Form} from "../form/Form";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    onSubmit: (appointment: AppointmentFormData) => void;
    onClose: () => void;
    startValues?: AppointmentFormRawData;
};

export type AppointmentFormData = {
    title: string;
    start: Moment;
    end: Moment;
    weekday: Weekday;
}

export type AppointmentFormRawData = {
    title: string;
    start: string;
    end: string;
    weekday: string;
}

const defaultValues: AppointmentFormRawData = {
    title: "",
    start: "",
    end: "",
    weekday: ""
}

export const AppointmentCreatorModal = ({onSubmit, startValues, onClose}: AppointmentCreatorProps) => {
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const {register, handleSubmit, clearErrors, setError, formState: { errors, dirtyFields }, reset} = useForm({ defaultValues: defaultValues, values: startValues });

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

    const processSubmit = (data: FieldValues) => {
        const start = timeService.ParseTime(data.start);
        const end = timeService.ParseTime(data.end);
        onSubmit({title: data.title, start, end, weekday: data.weekday});
        reset();
    };

    return (
        <Modal onClose={onClose} onSubmit={handleSubmit(processSubmit)} title={!!startValues ? "Veranstaltung Bearbeiten" : "Neue Veranstaltung"} submitText={!!startValues ? "Speichern" : "Hinzufügen"}>
            <Form>
                <TextField register={register("title", {required: true})} caption="Name" error={errors.title} dirty={dirtyFields.title || !!startValues?.title}/>
                <div className="w-full flex content-between gap-m">
                    <TimeChooser register={register("start", {required: true, validate: validateTimes})}
                                 caption="Startzeit"
                                 dirty={dirtyFields.start || !!startValues?.start}
                                 error={errors.start} />
                    <TimeChooser register={register("end", {required: true, validate: validateTimes})}
                                 caption="Endzeit"
                                 dirty={dirtyFields.end || !!startValues?.end}
                                 error={errors.end} />
                </div>
                <DropDown register={register("weekday", {required: true})}
                          options={weekdayService.AllWeekdays()}
                          labelFunction={labelFunction}
                          error={errors.weekday}
                          dirty={dirtyFields.weekday || !!startValues?.weekday}
                          caption="Wochentag" />
            </Form>
        </Modal>
    )
}