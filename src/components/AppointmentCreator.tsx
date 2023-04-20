import styles from "./AppointmentCreator.module.scss";
import {FieldValues, useForm} from "react-hook-form";
import {WeekdayService} from "../services/WeekdayService";
import React from "react";
import {Appointment} from "../models/appointment/Appointment";
import {TimeService} from "../services/TimeService";

type AppointmentCreatorProps = {
    /**
     * Callback that is called with the created appointment
     */
    submitCallback: (appointment: Appointment) => void;
};

export const AppointmentCreator = ({submitCallback}: AppointmentCreatorProps) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: FieldValues) => {
        const start =TimeService.ParseTime(data.start);
        const end = TimeService.ParseTime(data.end);
        submitCallback(new Appointment(data.name, data.weekday, start, end));
    };

    return (
        <div className={styles.box}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name:
                    <input {...register("name")} type="text" />
                </label>
                <label>
                    Start:
                    <input {...register("start")} type="time" />
                </label>
                <label>
                    Ende:
                    <input {...register("end")} type="time" />
                </label>
                <label>
                    Wochentag:
                    <select {...register("weekday")}>
                        {WeekdayService.AllWeekdays().map(weekday => {
                            return (
                                <option value={weekday} key={weekday}>
                                    {WeekdayService.GetLabel(weekday)}
                                </option>
                            )
                        })}
                    </select>
                </label>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}