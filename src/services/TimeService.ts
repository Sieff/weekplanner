import {Moment} from "moment";
import moment from "moment/moment";

export class TimeService {
    static ParseTime(time: string): Moment {
        return moment(time, 'HH:mm').utc(true);
    }

    static Render(time: Moment): string {
        return time.hours() + ":" + time.minutes();
    }
}