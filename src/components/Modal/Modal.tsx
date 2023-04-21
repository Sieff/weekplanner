import React, {useEffect, useRef} from "react";
import styles from "./Modal.module.scss";
import {Portal} from "../Portal";
import {Button, ButtonVariant} from "../Button";

type ModalProps = React.PropsWithChildren<{
    onClose: () => void;
    onSubmit: () => void;
    title: string;
}>

const Modal = ({onClose, onSubmit, title, children}: ModalProps) => {
    const backdrop = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const current = backdrop.current;
        const listener = (event: MouseEvent) => {
            if (event.target === current) onClose();
        };
        current?.addEventListener("click", listener);
        return () => current?.removeEventListener("click", listener);
    });

    return (
        <Portal>
            <div className={styles.backdrop} ref={backdrop}>
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
                                Hinzufügen
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;