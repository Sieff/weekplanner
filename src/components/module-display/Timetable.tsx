import {useSelector} from "react-redux";
import {selectAppointments} from "../../state/ModulesStateSlice";
import {TimetableColumn} from "./TimetableColumn";
import {HourColumn} from "./HourColumn";
import {useContext} from "react";
import {WeekdayServiceContext} from "../../services/ServiceProvider";

export const Timetable = () => {
    const weekdayService = useContext(WeekdayServiceContext);

    const appointments = useSelector(selectAppointments);

    return (
        <div className={"flex flex-row mx-l border-2 border-inactive rounded-rl p-l shadow-box"}>
            <HourColumn />
            {weekdayService.AllWeekdays().map((weekday) => {
                return <TimetableColumn weekday={weekday}
                                        appointments={appointments.filter((appointment) => appointment.weekday === weekday)}
                                        key={weekday} />
            })}
        </div>
    )
}