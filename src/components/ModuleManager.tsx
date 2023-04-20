import {useSelector} from "react-redux";
import {selectModules} from "../state/ModulesStateSlice";
import {ModuleEditor} from "./ModuleEditor";

export const ModuleManager = () => {
    const modules = useSelector(selectModules)

    return (
        <div>
            {Object.entries(modules).map(([id, module]) => {
                return (<ModuleEditor module={module} key={id}/>)
            })}
        </div>
    )
}