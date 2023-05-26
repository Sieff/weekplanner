import { v4 as uuid } from "uuid";
import {immerable} from "immer";
import {ColorVariant} from "./Variant";
import {SectionFormData} from "../components/modal/SectionCreatorModal";

export interface SectionModelData {
    moduleId: string;
    id: string;
    variant: string;
    title: string;
    optional: boolean;
}

export class SectionModel {
    [immerable] = true

    private _moduleId: string;
    private _id: string;
    private _variant: ColorVariant;
    private _title: string;
    private _optional: boolean;

    constructor(moduleId: string, title: string, optional: boolean, variant: ColorVariant);
    constructor(moduleId: string, title: string, optional: boolean, variant: ColorVariant, id: string);
    constructor(moduleId: string, title: string, optional: boolean, variant: ColorVariant, id?: string) {
        this._id = id ?? uuid();
        this._title = title;
        this._optional = optional;
        this._moduleId = moduleId;
        this._variant = variant;
    }

    static from(data: SectionModelData) {
        const variant = Object.values(ColorVariant).find((variant) => variant === data.variant)!;

        return new SectionModel(data.moduleId, data.title, data.optional, variant, data.id);
    }

    asData(): SectionModelData {
        return {moduleId: this._moduleId, id: this._id, variant: this._variant, title: this._title, optional: this._optional}
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