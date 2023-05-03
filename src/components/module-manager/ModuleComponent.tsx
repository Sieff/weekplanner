import {ModuleModel} from "../../models/ModuleModel";
import {SectionComponent} from "./SectionComponent";
import {useDispatch, useSelector} from "react-redux";
import {addSection, selectSectionsByModule} from "../../state/ModulesStateSlice";
import {SectionCreatorModal, SectionFormData} from "../modal/SectionCreatorModal";
import {SectionModel} from "../../models/SectionModel";
import {ColorVariant} from "../../models/Variant";
import {cls} from "../../styles/cls";
import {useComponentVisible} from "../../hooks/UseComponentVisible";
import {Button} from "../Button";
import React from "react";

type ModuleEditorProps = {
    module: ModuleModel;
}

const StyleMap: {[key in ColorVariant]: string} = {
    [ColorVariant.red]: "border-red-550",
    [ColorVariant.orange]: "border-orange-400",
    [ColorVariant.yellow]: "border-yellow-500",
    [ColorVariant.green]: "border-green-500",
    [ColorVariant.sky]: "border-sky-500",
    [ColorVariant.blue]: "border-blue-500",
    [ColorVariant.purple]: "border-purple-500",
    [ColorVariant.pink]: "border-pink-500",
}

export const ModuleComponent = ({module}: ModuleEditorProps) => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => selectSectionsByModule(state, module.id));
    const { isComponentVisible, showComponent, hideComponent } = useComponentVisible(false);

    const onCreate = (sectionFormData: SectionFormData) => {
        const newSection = new SectionModel(module.id, sectionFormData.title, sectionFormData.optional, module.variant);
        dispatch(addSection(newSection));
        hideComponent();
    };

    return (
        <div className={cls("p-l max-w-lg flex flex-col gap-m rounded-rl border-2 shadow-box",
            StyleMap[module.variant])}>
            <h2 className={"[word-break:break-word]"}>{module.title}</h2>
            {sections.map((section) =>
                <SectionComponent section={section} key={section.id} />)}
            <Button onClick={showComponent} variant={module.variant}>Abschnitt hinzufügen</Button>
            {isComponentVisible && <SectionCreatorModal onSubmit={onCreate} onClose={hideComponent} />}
        </div>
    )
}