import styles from "./Modal/AppointmentCreatorModal.module.scss";
import {useForm} from "react-hook-form";
import {Module} from "../models/Module";
import {AppointmentCreatorModal} from "./Modal/AppointmentCreatorModal";
import {AppointmentComponent} from "./AppointmentComponent";
import {useDispatch} from "react-redux";
import {addSingleAppointment} from "../state/ModulesStateSlice";
import {SingleAppointmentModel} from "../models/appointment/SingleAppointmentModel";

type ModuleEditorProps = {
    module: Module
}
export const ModuleEditor = ({module}: ModuleEditorProps) => {
    const {register} = useForm();

    const dispatch = useDispatch()

    const onCreate = (appointment: SingleAppointmentModel) => {
        dispatch(addSingleAppointment({module, appointment}));
    };

    return (
        <div className={styles.box}>
            <form>
                <label>
                    Name:
                    <input {...register("name")} type="text" />
                </label>
                {Object.entries(module.appointments).map(([id, appointment]) => <AppointmentComponent appointment={appointment} key={id} />)}
                <input type="submit" value="Submit"/>
            </form>
            <AppointmentCreatorModal submitCallback={onCreate} />
        </div>
    )
}