import styles from "./ModuleEditor.module.scss";
import {useForm} from "react-hook-form";
import {Module} from "../models/Module";
import {AppointmentCreatorModal, AppointmentFormData} from "./Modal/AppointmentCreatorModal";
import {AppointmentComponent} from "./AppointmentComponent";
import {connect, useDispatch} from "react-redux";
import {SingleAppointmentModel} from "../models/appointment/SingleAppointmentModel";
import formstyles from "../styles/formstyles.module.scss";
import {addSingle} from "../state/AppointmentsStateSlice";
import {RootState} from "../store";
import {AppointmentModel} from "../models/appointment/AppointmentModel";

type ModuleEditorProps = {
    module: Module;
    appointments?: {[key: string]: AppointmentModel};
}
const ModuleEditor = ({module, appointments}: ModuleEditorProps) => {
    const {register} = useForm();

    const dispatch = useDispatch()

    const onCreate = (appointmentData: AppointmentFormData) => {
        const appointment = new SingleAppointmentModel(module.id, appointmentData.name, appointmentData.weekday, appointmentData.start, appointmentData.end);
        dispatch(addSingle(appointment));
    };

    return (
        <div className={styles.container}>
            <form className={formstyles.form}>
                <div className={formstyles.input}>
                    <input className={formstyles.inputField} {...register("name")} type="text" />
                    <label className={formstyles.inputLabel}>
                    Name
                    </label>
                </div>
            </form>
            {appointments && Object.entries(appointments).map(([id, appointment]) =>
                <AppointmentComponent appointment={appointment} key={id} />)}
            <AppointmentCreatorModal submitCallback={onCreate} />
        </div>
    )
}

const mapStateToProps = (state: RootState, {module}: ModuleEditorProps) => {
    const appointments = Object.fromEntries(Object.entries(state.appointments).filter(([_,appointment]) => appointment.moduleId === module.id))
    return {
        appointments
    }
}

export default connect(mapStateToProps)(ModuleEditor);