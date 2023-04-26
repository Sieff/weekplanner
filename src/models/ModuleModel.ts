import { v4 as uuid } from "uuid";
import {immerable} from "immer"
import {SectionModel} from "./SectionModel";
import {ColorVariant} from "./Variant";

export class ModuleModel {
    [immerable] = true

    private _id: string;
    private _title: string;
    private _variant: ColorVariant;
    private _sections: { [key: string]: SectionModel } = {};


    constructor(title: string, variant: ColorVariant) {
        this._id = uuid();
        this._title = title;
        this._variant = variant;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get variant(): ColorVariant {
        return this._variant;
    }

    get sections(): { [key: string]: SectionModel } {
        return this._sections;
    }
}