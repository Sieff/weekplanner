import {useSelector} from "react-redux";
import {selectModules} from "../../state/ModulesStateSlice";
import styles from "./ModulesManager.module.scss"
import {ModuleComponent} from "./ModuleComponent";

export const ModulesManager = () => {
    console.log("moin1");
    const modules = useSelector(selectModules);

    console.log("moin2", modules);
    return (
        <div className={styles.container}>
            {modules.map((module) => {
                return (<ModuleComponent module={module} key={module.id}/>)
            })}
        </div>
    )
}