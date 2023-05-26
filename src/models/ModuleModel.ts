import { v4 as uuid } from "uuid";
import {immerable} from "immer";
import {ColorVariant} from "./Variant";

export interface ModuleModelData {
    id: string;
    title: string;
    variant: string;
}


export class ModuleModel {
    [immerable] = true

    private _id: string;
    private _title: string;
    private _variant: ColorVariant;


    constructor(title: string, variant: ColorVariant);
    constructor(title: string, variant: ColorVariant, id: string);
    constructor(title: string, variant: ColorVariant, id?: string) {
        this._id = id ?? uuid();
        this._title = title;
        this._variant = variant;
    }

    static from(data: ModuleModelData) {
        const variant = Object.values(ColorVariant).find((variant) => variant === data.variant)!;

        return new ModuleModel(data.title, variant, data.id);
    }

    asData(): ModuleModelData {
        return {id: this._id, variant: this._variant, title: this._title}
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
}