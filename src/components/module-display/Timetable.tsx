import {useSelector} from "react-redux";
import {selectAppointments} from "../../state/ModulesStateSlice";
import {TimetableColumn} from "./TimetableColumn";
import {HourColumn} from "./HourColumn";
import {useContext} from "react";
import {WeekdayServiceContext} from "../../services/ServiceProvider";

export const Timetable = () => {
    const weekdayService = useContext(WeekdayServiceContext);

    const appointmentsDict = useSelector(selectAppointments);

    return (
        <div className={"flex flex-row mx-l"}>
            <HourColumn />
            {weekdayService.AllWeekdays().map((weekday) => {
                return <TimetableColumn weekday={weekday}
                                        appointments={Object.fromEntries(Object.entries(appointmentsDict).filter(([_, appointment]) => appointment.weekday === weekday))}
                                        key={weekday} />
            })}
        </div>
    )
}