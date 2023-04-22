import { v4 as uuid } from "uuid";
import {immerable} from "immer"
import {SectionModel} from "./SectionModel";

export class ModuleModel {
    [immerable] = true

    private _id: string;
    private _title: string;
    private _sections: { [key: string]: SectionModel } = {};

    constructor(title: string) {
        this._id = uuid();
        this._title = title;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get sections(): { [key: string]: SectionModel } {
        return this._sections;
    }
}