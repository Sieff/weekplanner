import {Button} from "./Button";
import {ModuleCreatorModal, ModuleFormData} from "./modal/ModuleCreatorModal";
import React, {useContext} from "react";
import {TimeServiceContext, VariantServiceContext} from "../services/ServiceProvider";
import {useDispatch, useSelector} from "react-redux";
import {ModuleModel} from "../models/ModuleModel";
import {
    addModule, removeAll,
    selectAppointments,
    selectSections,
    updateAppointmentsActive
} from "../state/ModulesStateSlice";
import {useComponentVisible} from "../hooks/UseComponentVisible";
import {DeleteConfirmationModal} from "./modal/DeleteConfirmationModal";

export const ToolBar = () => {
    const variantService = useContext(VariantServiceContext);
    const timeService = useContext(TimeServiceContext);
    const sections = useSelector(selectSections);
    const appointments = useSelector(selectAppointments);
    const dispatch = useDispatch();
    const { isComponentVisible, showComponent, hideComponent } = useComponentVisible(false);
    const { isComponentVisible: deleteTimetableVisible, showComponent: showDeleteTimetable, hideComponent: hideDeleteTimetable } = useComponentVisible(false);

    const onCreate = (moduleFormData: ModuleFormData) => {
        const newModule = new ModuleModel(moduleFormData.title, variantService.GenerateVariant());
        dispatch(addModule(newModule));
        hideComponent();
    };

    const generateSchedule = () => {
        const scheduledAppointments = timeService.GenerateSchedule(sections, appointments);
        dispatch(updateAppointmentsActive(scheduledAppointments));
    }

    const processRemoveAll = () => {
        dispatch(removeAll());
        hideDeleteTimetable();
    }

    return (
        <div className={"rounded-rl p-l mx-l border-primary border-2 flex gap-m shadow-box"}>
            <Button onClick={showComponent}>Modul hinzufügen</Button>
            {isComponentVisible && <ModuleCreatorModal onSubmit={onCreate} onClose={hideComponent} />}
            <Button onClick={generateSchedule}>
                Zeitplan generieren
            </Button>
            <Button onClick={showDeleteTimetable}>
                Alle Module Löschen
            </Button>
            {deleteTimetableVisible && <DeleteConfirmationModal onSubmit={processRemoveAll} onClose={hideDeleteTimetable} />}
        </div>
    )
}