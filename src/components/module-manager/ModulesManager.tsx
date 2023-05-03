import {useSelector} from "react-redux";
import {selectModules} from "../../state/ModulesStateSlice";
import {ModuleComponent} from "./ModuleComponent";

export const ModulesManager = () => {
    const modules = useSelector(selectModules);

    return (
        <div className={"flex flex-wrap items-start gap-m px-l"}>
            {modules.map((module) => {
                return (<ModuleComponent module={module} key={module.id}/>)
            })}
        </div>
    )
}