import React from "react";
import {ButtonVariant, ColorVariant} from "../models/Variant";
import {cls} from "../styles/cls";

type ButtonProps = React.PropsWithChildren<{
    onClick: () => void;
    variant?: ButtonVariant | ColorVariant;
}>

const ButtonStyleMap: {[key in ButtonVariant | ColorVariant]: string} = {
    [ColorVariant.red]: "bg-red-550 shadow-red-550 hover:bg-red-600",
    [ColorVariant.orange]: "bg-orange-400 shadow-orange-400 hover:bg-orange-600",
    [ColorVariant.yellow]: "bg-yellow-500 shadow-yellow-500 hover:bg-yellow-600",
    [ColorVariant.green]: "bg-green-500 shadow-green-500 hover:bg-green-600",
    [ColorVariant.sky]: "bg-sky-500 shadow-sky-500 hover:bg-sky-600",
    [ColorVariant.blue]: "bg-blue-500 shadow-blue-500 hover:bg-blue-600",
    [ColorVariant.purple]: "bg-purple-500 shadow-purple-500 hover:bg-purple-600",
    [ColorVariant.pink]: "bg-pink-500 shadow-pink-500 hover:bg-pink-600",

    [ButtonVariant.inactive]: "bg-inactive shadow-inactive hover:bg-inactive-dark",
    [ButtonVariant.primary]: "bg-primary shadow-primary hover:bg-primary-dark",
    [ButtonVariant.secondary]: "bg-secondary shadow-secondary hover:bg-secondary-dark",
    [ButtonVariant.danger]: "bg-danger shadow-danger hover:bg-danger-dark",
    [ButtonVariant.accept]: "bg-accept shadow-accept hover:bg-accept-dark"
}

export const Button = ({onClick, variant = ButtonVariant.primary, children}: ButtonProps) => {
    return (
        <div className={cls("p-m text-white shadow-button rounded-rs border-none cursor-pointer duration-200",
            ButtonStyleMap[variant as ButtonVariant])} onClick={onClick}>
            {children}
        </div>
    )
}