import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'Test recipe description.',
    //         `https://www.eatingwell.com/thmb/MgogUdX7uFDsesnGLAqkmdZiZ8M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RM_Creamy_Chicken_Mushroom_and_Spinach_Skillet_Casserole_1x1_4755-eeaf608727dc4b02b7e7098345882089.jpg`,
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         'Another Test Recipe',
    //         'Test recipe description 2.',
    //         `https://www.eatingwell.com/thmb/MgogUdX7uFDsesnGLAqkmdZiZ8M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RM_Creamy_Chicken_Mushroom_and_Spinach_Skillet_Casserole_1x1_4755-eeaf608727dc4b02b7e7098345882089.jpg`,
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1)
    //         ]),
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}