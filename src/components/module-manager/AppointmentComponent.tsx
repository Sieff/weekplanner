import {AppointmentModel} from "../../models/AppointmentModel";
import {TimeServiceContext, WeekdayServiceContext} from "../../services/ServiceProvider";
import {useContext, useState} from "react";
import {ColorVariant} from "../../models/Variant";
import {cls} from "../../styles/cls";
import {useDispatch} from "react-redux";
import {removeAppointment, updateAppointment, updateAppointmentsActive} from "../../state/ModulesStateSlice";
import {DotsMenu, Option} from "../DotsMenu";
import {AppointmentCreatorModal, AppointmentFormData} from "../modal/AppointmentCreatorModal";

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

enum DotsMenuActions {
    delete,
    edit
}

const DotsMenuOptions: Option[] = [
    {
        label: "Bearbeiten",
        value: DotsMenuActions.edit
    },
    {
        label: "Löschen",
        value: DotsMenuActions.delete
    }
]

export const AppointmentComponent = ({appointment}: SingleAppointmentProps) => {
    const dispatch = useDispatch();
    const timeService = useContext(TimeServiceContext);
    const weekdayService = useContext(WeekdayServiceContext);
    const [showEditor, setShowEditor] = useState(true);

    const toggleAppointmentActive = () => {
        dispatch(updateAppointmentsActive( { [appointment.id]: !appointment.active}))
    }

    const handleDotsMenuCallback = (action: DotsMenuActions) => {
        switch (action) {
            case DotsMenuActions.delete:
                dispatch(removeAppointment(appointment));
                break;
            case DotsMenuActions.edit:
                console.log(action)
                setShowEditor(true);
                break;
        }
    }

    const submitUpdateAppointment = (data: AppointmentFormData) => {
        setShowEditor(false);
        dispatch(updateAppointment({appointment, data}));
    }

    const weekday = weekdayService.GetLabel(appointment.weekday);

    return (
        <div className={cls("p-m rounded-rm border-2 shadow-box flex flex-col cursor-pointer",
            appointment.active ? StyleMap[appointment.variant] : "border-white")}
             onClick={toggleAppointmentActive}>
            <div className={"flex justify-between items-center"}>
                <h3>{appointment.title}</h3>
                <DotsMenu options={DotsMenuOptions} optionCallback={handleDotsMenuCallback} />
                <AppointmentCreatorModal submitCallback={submitUpdateAppointment} startValues={appointment.GetRawData()} initialShow={showEditor} />
            </div>
            <div>
                {weekday}
            </div>
            <div>
                {timeService.Render(appointment.start) + " - " + timeService.Render(appointment.end)}
            </div>
        </div>
    )
}