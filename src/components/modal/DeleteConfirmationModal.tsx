import React from "react";
import Modal from "./Modal";
import {ColorVariant} from "../../models/Variant";

type DeleteConfirmationModalProps = {
    /**
     * Callback that is called with the created appointment
     */
    onSubmit: () => void;
    onClose: () => void;
};

export const DeleteConfirmationModal = ({onSubmit, onClose}: DeleteConfirmationModalProps) => {

    return (
        <Modal onClose={onClose} onSubmit={onSubmit} title={"Wirklich löschen?"} submitText={"Löschen"} variant={ColorVariant.red}>
            <p>Möchtest du wirklich den gesamten Zeitplan löschen?</p>
            <p>Alle Module und ihre Veranstaltungen werden gelöscht.</p>
        </Modal>
    )
}