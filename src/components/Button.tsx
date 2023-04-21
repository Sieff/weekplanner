import React from "react";
import {cls} from "../styles/cls";
import styles from "./Button.module.scss"

export enum ButtonVariant {
    inactive,
    primary,
    secondary,
    danger,
    accept,
}

const ButtonStyleMap: {[key in ButtonVariant]: string} = {
    [ButtonVariant.inactive]: styles.inactive,
    [ButtonVariant.primary]: styles.primary,
    [ButtonVariant.secondary]: styles.secondary,
    [ButtonVariant.danger]: styles.danger,
    [ButtonVariant.accept]: styles.accept,
}

type ButtonProps = React.PropsWithChildren<{
    onClick: () => void;
    variant?: ButtonVariant;
}>

export const Button = ({onClick, variant = ButtonVariant.primary, children}: ButtonProps) => {
    return (
        <div className={cls(styles.button, ButtonStyleMap[variant])} onClick={onClick}>
            {children}
        </div>
    )
}