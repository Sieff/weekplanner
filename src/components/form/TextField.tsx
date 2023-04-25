import {cls} from "../../styles/cls";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

type TextFieldProps = {
    register: UseFormRegisterReturn;
    caption: string;
    error?: FieldError;
    dirty?: boolean;
}

export const TextField = ({register, caption, error, dirty}: TextFieldProps) => {
    return (
        <div className="flex flex-col-reverse relative w-full pt-6 mb-6">
            <input className={cls("peer z-10 bg-transparent border-b-2 py-1 text-lg outline-0 focus:border-inactive",
                error && "border-danger",
                dirty && "border-inactive",
                !error && !dirty && "border-divider")}
                   {...register}
                   type="text" />
            <label className={cls("absolute top-6 duration-250 peer-focus:text-inactive peer-focus:translate-y-m1.5",
                error && "text-danger",
                dirty && "text-inactive -translate-y-6",
                !error && !dirty && "text-divider")}>
                {caption}
            </label>
        </div>
    )
}