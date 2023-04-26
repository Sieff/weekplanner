import {ColorVariant} from "../models/Variant";


export class VariantService {
    public GenerateVariant(): ColorVariant {
        const idx = Math.floor(Math.random() * (Object.entries(ColorVariant).length));
        return Object.values(ColorVariant)[idx] as ColorVariant;
    }
}