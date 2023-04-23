import {Weekday} from "../models/Weekday";

export class WeekdayService {
    private readonly _labelDictGerman: {[key in Weekday]: string} = {
        [Weekday.Monday]: "Montag",
        [Weekday.Tuesday]: "Dienstag",
        [Weekday.Wednesday]: "Mittwoch",
        [Weekday.Thursday]: "Donnerstag",
        [Weekday.Friday]: "Freitag",
        [Weekday.Saturday]: "Samstag",
        [Weekday.Sunday]: "Sonntag"
    };

    public AllWeekdays(): Weekday[] {
        return [Weekday.Monday, Weekday.Tuesday, Weekday.Wednesday, Weekday.Thursday, Weekday.Friday, Weekday.Saturday, Weekday.Sunday];
    }

    public GetLabel(weekday: Weekday): string {
        return this._labelDictGerman[weekday];
    }
}