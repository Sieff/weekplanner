import {useSelector} from "react-redux";
import {selectModules} from "../../state/ModulesStateSlice";
import styles from "./ModulesManager.module.scss"
import {ModuleComponent} from "./ModuleComponent";

export const ModulesManager = () => {
    const modules = useSelector(selectModules);

    return (
        <div className={styles.container}>
            {Object.entries(modules).map(([id, module]) => {
                return (<ModuleComponent module={module} key={id}/>)
            })}
        </div>
    )
}