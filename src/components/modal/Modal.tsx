import React, {useEffect, useRef} from "react";
import styles from "./Modal.module.scss";
import {Portal} from "../Portal";
import {Button} from "../Button";
import {ButtonVariant} from "../../models/Variant";

type ModalProps = React.PropsWithChildren<{
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    edit?: boolean;
}>

const Modal = ({onClose, onSubmit, title, children, edit}: ModalProps) => {
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
                        <Button onClick={onSubmit} variant={ButtonVariant.accept}>
                            <div className={styles.modalButtonContent}>
                                {edit ? "Speichern" : "Hinzufügen"}
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;