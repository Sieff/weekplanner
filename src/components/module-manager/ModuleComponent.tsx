import styles from "./ModuleComponent.module.scss";
import {ModuleModel} from "../../models/ModuleModel";
import {SectionComponent} from "./SectionComponent";
import {useDispatch} from "react-redux";
import {addSection} from "../../state/ModulesStateSlice";
import {SectionCreatorModal, SectionFormData} from "../modal/SectionCreatorModal";
import {SectionModel} from "../../models/SectionModel";

type ModuleEditorProps = {
    module: ModuleModel;
}
export const ModuleComponent = ({module}: ModuleEditorProps) => {
    const dispatch = useDispatch()

    const onCreate = (sectionFormData: SectionFormData) => {
        const newSection = new SectionModel(module.id, sectionFormData.title, sectionFormData.optional);
        dispatch(addSection(newSection));
    };

    return (
        <div className={styles.container}>
            <h2>{module.title}</h2>
            {Object.entries(module.sections).map(([id, section]) =>
                <SectionComponent section={section} key={id} />)}
            <SectionCreatorModal submitCallback={onCreate} />
        </div>
    )
}