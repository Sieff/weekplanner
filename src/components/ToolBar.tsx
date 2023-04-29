import {Button} from "./Button";
import {ModuleCreatorModal, ModuleFormData} from "./modal/ModuleCreatorModal";
import {useContext} from "react";
import {TimeServiceContext, VariantServiceContext} from "../services/ServiceProvider";
import {useDispatch, useSelector} from "react-redux";
import {ModuleModel} from "../models/ModuleModel";
import {
    addModule,
    selectAppointments,
    selectSections,
    updateAppointmentsActive
} from "../state/ModulesStateSlice";

export const ToolBar = () => {
    const variantService = useContext(VariantServiceContext);
    const timeService = useContext(TimeServiceContext);
    const sections = useSelector(selectSections);
    const appointments = useSelector(selectAppointments);
    const dispatch = useDispatch();

    const onCreate = (moduleFormData: ModuleFormData) => {
        const newModule = new ModuleModel(moduleFormData.title, variantService.GenerateVariant());
        dispatch(addModule(newModule));
    };

    const generateSchedule = () => {
        const scheduledAppointments = timeService.GenerateSchedule(sections, appointments);
        dispatch(updateAppointmentsActive(scheduledAppointments));
    }

    return (
        <div className={"rounded-rl p-l mx-l border-primary border-2 flex gap-m"}>
            <ModuleCreatorModal submitCallback={onCreate}/>
            <Button onClick={generateSchedule}>
                Zeitplan generieren
            </Button>
        </div>
    )
}