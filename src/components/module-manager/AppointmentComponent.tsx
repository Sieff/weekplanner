import {AppointmentModel} from "../../models/AppointmentModel";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";
import {useContext} from "react";
import {ColorVariant} from "../../models/Variant";
import {cls} from "../../styles/cls";
import {useDispatch} from "react-redux";
import {updateAppointmentsActive} from "../../state/ModulesStateSlice";

type SingleAppointmentProps = {
    appointment: AppointmentModel;
}

const StyleMap: {[key in ColorVariant]: string} = {
    [ColorVariant.red]: "border-red-550",
    [ColorVariant.orange]: "border-orange-400",
    [ColorVariant.yellow]: "border-yellow-500",
    [ColorVariant.green]: "border-green-500",
    [ColorVariant.sky]: "border-sky-500",
    [ColorVariant.blue]: "border-blue-500",
    [ColorVariant.purple]: "border-purple-500",
    [ColorVariant.pink]: "border-pink-500",
}

export const AppointmentComponent = ({appointment}: SingleAppointmentProps) => {
    const dispatch = useDispatch();
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);

    const toggleAppointmentActive = () => {
        dispatch(updateAppointmentsActive( { [appointment.id]: !appointment.active}))
    }

    const weekday = weekdayService.GetLabel(appointment.weekday);

    return (
        <div className={cls("p-m rounded-rm border-2 shadow-box flex flex-col cursor-pointer",
            appointment.active ? StyleMap[appointment.variant] : "border-white")}
             onClick={toggleAppointmentActive}>
            <h3>{appointment.title}</h3>
            <div>
                {weekday}
            </div>
            <div>
                {timeService.Render(appointment.start) + " - " + timeService.Render(appointment.end)}
            </div>
        </div>
    )
}