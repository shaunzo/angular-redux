import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  // We need to define a readonly type to tell what kind of action this is
  readonly type = ADD_INGREDIENT;

  // ngrx does not support supplying a payload so this is how we add it
  constructor(public payload: Ingredient) {}
}

export type ShoppingListActions = AddIngredient;
