import {Weekday} from "../models/Weekday";

export class WeekdayService {
    static AllWeekdays(): Weekday[] {
        return [Weekday.Monday, Weekday.Tuesday, Weekday.Wednesday, Weekday.Thursday, Weekday.Friday, Weekday.Saturday, Weekday.Sunday];
    }

    static GetLabel(weekday: Weekday): string {
        switch (weekday) {
            case Weekday.Monday: return "Montag"
            case Weekday.Tuesday: return "Dienstag"
            case Weekday.Wednesday: return "Mittwoch"
            case Weekday.Thursday: return "Donnerstag"
            case Weekday.Friday: return "Freitag"
            case Weekday.Saturday: return "Samstag"
            case Weekday.Sunday: return "Sonntag"
            default: return "";
        }
    }
}