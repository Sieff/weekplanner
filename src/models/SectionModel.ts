import { v4 as uuid } from "uuid";
import {immerable} from "immer";
import {ColorVariant} from "./Variant";
import {SectionFormData} from "../components/modal/SectionCreatorModal";

export class SectionModel {
    [immerable] = true

    private _moduleId: string;
    private _id: string;
    private _variant: ColorVariant;
    private _title: string;
    private _optional: boolean;

    constructor(moduleId: string, title: string, optional: boolean, variant: ColorVariant) {
        this._id = uuid();
        this._title = title;
        this._optional = optional;
        this._moduleId = moduleId;
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

    get moduleId(): string {
        return this._moduleId;
    }

    get optional(): boolean {
        return this._optional;
    }

    set title(value: string) {
        this._title = value;
    }

    set optional(value: boolean) {
        this._optional = value;
    }

    public GetRawData(): SectionFormData {
        return {
            title: this._title,
            optional: this._optional
        }
    }
}