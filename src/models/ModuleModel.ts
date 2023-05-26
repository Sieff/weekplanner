import { v4 as uuid } from "uuid";
import {immerable} from "immer";
import {ColorVariant} from "./Variant";
import {VariantService} from "../services/VariantService";

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
        const variant = Object.entries(ColorVariant).find(([key, value]) => key === data.variant);
        if (!variant) {
            const variantService = new VariantService();
            return new ModuleModel(data.title, variantService.GenerateVariant(), data.id);
        } else {
            return new ModuleModel(data.title, variant[1], data.id);
        }
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