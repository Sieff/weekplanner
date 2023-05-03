import {AppointmentCreatorModal, AppointmentFormData} from "../modal/AppointmentCreatorModal";
import {useDispatch, useSelector} from "react-redux";
import {SectionModel} from "../../models/SectionModel";
import {
    addAppointment,
    removeSection,
    selectAppointmentsBySection, updateSection
} from "../../state/ModulesStateSlice";
import {AppointmentComponent} from "./AppointmentComponent";
import {AppointmentModel} from "../../models/AppointmentModel";
import {Button} from "../Button";
import React from "react";
import {useComponentVisible} from "../../hooks/UseComponentVisible";
import {DotsMenu, EditActions, EditOptions} from "../DotsMenu";
import {SectionCreatorModal, SectionFormData} from "../modal/SectionCreatorModal";

type SectionComponentProps = {
    section: SectionModel;
}

export const SectionComponent = ({section}: SectionComponentProps) => {
    const dispatch = useDispatch()
    const appointments = useSelector((state) => selectAppointmentsBySection(state, section.id));
    const { isComponentVisible: appointmentCreatorVisible, showComponent: showAppointmentCreator, hideComponent: hideAppointmentCreator } = useComponentVisible(false);
    const { isComponentVisible: sectionEditorVisible, showComponent: showSectionEditor, hideComponent: hideSectionEditor } = useComponentVisible(false);

    const onCreate = (appointmentData: AppointmentFormData) => {
        const newAppointment = new AppointmentModel(section.id, section.variant, appointmentData.title, appointmentData.weekday, appointmentData.start, appointmentData.end);
        dispatch(addAppointment(newAppointment));
        hideAppointmentCreator();
    };

    const handleDotsMenuCallback = (action: EditActions) => {
        switch (action) {
            case EditActions.delete:
                dispatch(removeSection(section));
                break;
            case EditActions.edit:
                showSectionEditor();
                break;
        }
    }

    const submitUpdateSection = (data: SectionFormData) => {
        dispatch(updateSection({section, data}));
        hideSectionEditor();
    }

    return (
        <div className={"flex flex-col gap-s"}>
            <div className={"flex items-center gap-s"}>
                <h3>{section.title}</h3>
                {section.optional && <div className={"text-divider"}>- flexibel</div>}
                <DotsMenu options={EditOptions} optionCallback={handleDotsMenuCallback} />
                {sectionEditorVisible && <SectionCreatorModal onSubmit={submitUpdateSection} startValues={section.GetRawData()} onClose={hideSectionEditor} />}
            </div>
            <div className={"flex flex-wrap gap-s"}>
                {appointments.map((appointment) => {
                    return (
                        <AppointmentComponent appointment={appointment} key={appointment.id} />
                    )}
                )}
            </div>
            <Button onClick={showAppointmentCreator} variant={section.variant}>Veranstaltung hinzufügen</Button>
            {appointmentCreatorVisible && <AppointmentCreatorModal onSubmit={onCreate} onClose={hideAppointmentCreator} />}
            <div className={"w-full h-2px bg-divider mt-s"}></div>
        </div>
    )
}