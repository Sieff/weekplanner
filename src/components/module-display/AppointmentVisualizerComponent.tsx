import {AppointmentModel} from "../../models/AppointmentModel";
import {ColorVariant} from "../../models/Variant";
import {cls} from "../../styles/cls";

type AppointmentVisualizerComponentProps = {
    appointment: AppointmentModel;
    start: number;
    end: number;
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

export const AppointmentVisualizerComponent = ({appointment, start, end}: AppointmentVisualizerComponentProps) => {
    return (
        <div className={cls("bg-white rounded-rm flex justify-center items-center flex-col overflow-y-hidden border-2",
            StyleMap[appointment.variant])} style={{gridRowStart: start, gridRowEnd: end}}>
            <h3>{appointment.title}</h3>
        </div>
    )
}