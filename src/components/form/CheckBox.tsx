import {cls} from "../../styles/cls";
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import styles from "./CheckBox.module.scss";

type CheckBoxProps = React.PropsWithChildren<{
    register: UseFormRegisterReturn;
    /**
     * If caption is given, no children will be rendered!
     */
    caption?: string;
}>

export const CheckBox = ({register, caption, children}: CheckBoxProps) => {
    return (
        <div className="relative mb-6">
            <input {...register} className={cls(styles.inpCbx)} id="cbx" type="checkbox" style={{display: "none"}}/>
            <label className={cls("flex flex-row items-center gap-s", styles.cbx)} htmlFor="cbx">
                <span>
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
                <div>
                    {caption ? caption : children}
                </div>
            </label>
        </div>
    )
}