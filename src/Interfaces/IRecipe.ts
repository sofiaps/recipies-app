import { IIngredient } from "./IIngredient";
import { IKey } from "./IKey";

export interface IRecipe extends IKey {
    title: string;
    instructions: string;
    filePath?: string;
    imageUrl?: string;
    ingredients: IIngredient[];
    userUid: string;
}
