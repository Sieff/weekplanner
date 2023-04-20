import styles from "./AppointmentCreator.module.scss";
import {useForm} from "react-hook-form";
import {Module} from "../models/Module";
import {AppointmentCreator} from "./AppointmentCreator";
import {Appointment} from "../models/appointment/Appointment";
import {FixedAppointment} from "./FixedAppointment";
import {useDispatch} from "react-redux";
import {addFixedAppointment} from "../state/ModulesStateSlice";

type ModuleEditorProps = {
    module: Module
}
export const ModuleEditor = ({module}: ModuleEditorProps) => {
    const {register} = useForm();

    const dispatch = useDispatch()

    const onCreate = (appointment: Appointment) => {
        dispatch(addFixedAppointment({module, appointment}));
    };

    return (
        <div className={styles.box}>
            <form>
                <label>
                    Name:
                    <input {...register("name")} type="text" />
                </label>
                {Object.entries(module.fixedAppointments).map(([id, appointment]) => <FixedAppointment appointment={appointment} key={id} />)}
                <input type="submit" value="Submit"/>
            </form>
            <AppointmentCreator submitCallback={onCreate} />
        </div>
    )
}