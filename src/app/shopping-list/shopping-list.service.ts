import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
       return this.ingredients[index]; 
    }

    private addIngredientHelper(ingredient: Ingredient) {
        if (ingredient.name.length < 1) return;
        
        const i = this.ingredients.findIndex(i => i.name === ingredient.name);
        if (i > -1) {
            this.ingredients[i].amount += ingredient.amount;
        } else {
            this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
        }
    }

    addIngredient(ingredient: Ingredient) {
        this.addIngredientHelper(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        for (let ingredient of ingredients) {
            this.addIngredientHelper(ingredient);
        }

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        if (newIngredient.name.length < 1) return;
        
        const i = this.ingredients.findIndex(i => i.name === newIngredient.name);
        if (i > -1 && i != index) {
            this.ingredients[i].amount += newIngredient.amount;
            this.ingredients.splice(index, 1);
        } else {
            this.ingredients[index] = newIngredient;
        }

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}