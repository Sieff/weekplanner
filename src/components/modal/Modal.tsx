import React, {useEffect, useRef} from "react";
import styles from "./Modal.module.scss";
import {Portal} from "../Portal";
import {Button} from "../Button";
import {ButtonVariant, ColorVariant} from "../../models/Variant";

type ModalProps = React.PropsWithChildren<{
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    submitText: string;
    variant?: ColorVariant;
}>

const Modal = ({onClose, onSubmit, title, children, submitText, variant}: ModalProps) => {
    const backdrop = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const current = backdrop.current;
        const listener = (event: MouseEvent) => {
            if (event.target === current) onClose();
        };
        current?.addEventListener("mousedown", listener);
        return () => current?.removeEventListener("mousedown", listener);
    });

    const stopPropagation = (e: any) => {
        e.stopPropagation();
    }

    return (
        <Portal>
            <div className={styles.backdrop} ref={backdrop} onClick={stopPropagation}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{title}</h2>
                    </div>
                    <div className={styles.modalBody}>{children}</div>
                    <div className={styles.modalFooter}>
                        <Button onClick={onClose} variant={ButtonVariant.inactive}>
                            <div className={styles.modalButtonContent}>
                                Abbrechen
                            </div>
                        </Button>
                        <Button onClick={onSubmit} variant={variant ?? ButtonVariant.accept}>
                            <div className={styles.modalButtonContent}>
                                {submitText}
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;