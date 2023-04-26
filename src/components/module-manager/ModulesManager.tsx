import {useDispatch, useSelector} from "react-redux";
import {addModule, selectModules} from "../../state/ModulesStateSlice";
import styles from "./ModulesManager.module.scss"
import {ModuleComponent} from "./ModuleComponent";
import {ModuleCreatorModal, ModuleFormData} from "../modal/ModuleCreatorModal";
import {ModuleModel} from "../../models/ModuleModel";
import {useContext} from "react";
import {VariantServiceContext} from "../../services/ServiceProvider";

export const ModulesManager = () => {
    const modules = useSelector(selectModules);
    const variantService = useContext(VariantServiceContext);
    const dispatch = useDispatch();

    const onCreate = (moduleFormData: ModuleFormData) => {
        const newModule = new ModuleModel(moduleFormData.title, variantService.GenerateVariant());
        dispatch(addModule(newModule));
    };

    return (
        <div className={styles.container}>
            {Object.entries(modules).map(([id, module]) => {
                return (<ModuleComponent module={module} key={id}/>)
            })}
            <ModuleCreatorModal submitCallback={onCreate} />
        </div>
    )
}