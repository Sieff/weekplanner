import {Moment} from "moment";
import moment from "moment/moment";
import {TimeUnitModel} from "../models/TimeUnitModel";

export class TimeService {
    static ParseTime(time: string): Moment {
        return moment(time, 'HH:mm').utc(true);
    }

    static Render(time: Moment): string {
        return time.format("HH:mm");
    }

    static TimetableStart: Moment = moment("08:00", 'HH:mm').utc(true);
    static TimetableEnd: Moment = moment("20:00", 'HH:mm').utc(true);
    static TimetableStep: number = 15;

    static GenerateTimeUnits: () => TimeUnitModel[] = () => {
        const timeUnits = [];

        let current = moment(TimeService.TimetableStart);
        while (current < TimeService.TimetableEnd) {
            const start = moment(current);
            const end = moment(current).add(TimeService.TimetableStep, "minutes");
            timeUnits.push(new TimeUnitModel(start, end));
            current.add(TimeService.TimetableStep, "minutes");
        }

        return timeUnits;
    }

    static GenerateHours: () => Moment[] = () => {
        const hours = [];

        let current = moment(TimeService.TimetableStart);
        while (current <= TimeService.TimetableEnd) {
            hours.push(moment(current));
            current.add(2, "hour");
        }

        return hours;
    }

    static GetTimeUnitId: (time: Moment) => number = (time) => {
        const units = TimeService.GenerateTimeUnits();
        if (time < TimeService.TimetableStart) return 0;
        if (time >= TimeService.TimetableEnd) return units.length - 1;

        let current: number = 0;
        units.forEach((unit, idx) => {
            if (time >= unit.start && time < unit.end) {
                current = idx;
            }
        });

        return current;
    }
}