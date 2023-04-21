import {useSelector} from "react-redux";
import {selectModules} from "../state/ModulesStateSlice";
import {ModuleEditor} from "./ModuleEditor";
import styles from "./ModulesManager.module.scss"

export const ModulesManager = () => {
    const modules = useSelector(selectModules)

    return (
        <div className={styles.moduleManager}>
            {Object.entries(modules).map(([id, module]) => {
                return (<ModuleEditor module={module} key={id}/>)
            })}
        </div>
    )
}