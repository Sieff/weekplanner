import {Moment} from "moment";

export class TimeUnitModel {
    private _start: Moment;
    private _end: Moment;

    constructor(start: Moment, end: Moment) {
        this._start = start;
        this._end = end;
    }

    get start(): moment.Moment {
        return this._start;
    }

    get end(): moment.Moment {
        return this._end;
    }
}