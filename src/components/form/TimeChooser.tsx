import React from "react";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {cls} from "../../styles/cls";

type TimeChooserProps = {
    register: UseFormRegisterReturn;
    error?: FieldError;
    dirty?: boolean;
    caption: string;
}

export const TimeChooser = ({register, caption, dirty, error}: TimeChooserProps) => {
    console.log(caption, error && true);

    return (
        <div className="flex flex-col-reverse relative w-full pt-6 mb-6">
            <input className={cls("peer z-10 bg-transparent border-b-2 py-1 text-lg outline-0 focus:border-inactive",
                error && "border-danger",
                dirty && !error && "border-inactive",
                !error && !dirty && "border-divider")}
                   {...register}
                   type="time" />
            <label className={cls("absolute top-6 duration-250 peer-focus:text-inactive -translate-y-6",
                error && "text-danger",
                dirty && !error && "text-inactive",
                !error && !dirty && "text-divider")}>
                {caption}
            </label>
        </div>
    )
}