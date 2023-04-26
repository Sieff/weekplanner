import React from "react";
import {ButtonVariant, ColorVariant} from "../models/Variant";
import {cls} from "../styles/cls";
import styles from "./Button.module.scss";

type ButtonProps = React.PropsWithChildren<{
    onClick: () => void;
    variant?: ButtonVariant | ColorVariant;
}>

const ButtonStyleMap: {[key in ButtonVariant | ColorVariant]: string} = {
    [ColorVariant.variant0]: styles.variant0,
    [ColorVariant.variant1]: styles.variant0,
    [ColorVariant.variant2]: styles.variant0,
    [ColorVariant.variant3]: styles.variant0,
    [ColorVariant.variant4]: styles.variant0,
    [ColorVariant.variant5]: styles.variant0,
    [ColorVariant.variant6]: styles.variant0,
    [ColorVariant.variant7]: styles.variant0,

    [ButtonVariant.inactive]: styles.inactive,
    [ButtonVariant.primary]: styles.primary,
    [ButtonVariant.secondary]: styles.secondary,
    [ButtonVariant.danger]: styles.danger,
    [ButtonVariant.accept]: styles.accept
}

export const Button = ({onClick, variant = ButtonVariant.primary, children}: ButtonProps) => {
    return (
        <div className={cls("p-m text-white rounded-rs border-none cursor-pointer duration-300 bg-buttonGradient hover:bg-bottom",
            ButtonStyleMap[variant as ButtonVariant],
            styles.button)} onClick={onClick}>
            {children}
        </div>
    )
}