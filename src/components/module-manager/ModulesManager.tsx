import {useSelector} from "react-redux";
import {selectModules} from "../../state/ModulesStateSlice";
import styles from "./ModulesManager.module.scss"
import {ModuleComponent} from "./ModuleComponent";

export const ModulesManager = () => {
    const modules = useSelector(selectModules);

    return (
        <div className={styles.container}>
            {modules.map((module) => {
                return (<ModuleComponent module={module} key={module.id}/>)
            })}
        </div>
    )
}