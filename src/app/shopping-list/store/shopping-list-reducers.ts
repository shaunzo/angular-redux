import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

// We define overall app sate
export interface AppState {
  shoppingList: State;
}

// We define what our state will look like
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

/**
 * On start up when the first action is dispatched there is no current state to compare it to and replace so we need to set an inital state
 */
const initalState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

/**
 *
 * @param state // state is the current state which is automatically passed in by ngrx
 * @param action
 */
export function shoppingListReducer(state = initalState, action: ShoppingListActions.ShoppingListActions) {
  // Determine which action was dispatched
  switch (action.type) {
    // ShoppingListActions.ADD_INGREDIENT comes from the actions file
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // Take the old state
        ingredients: [...state.ingredients, action.payload] // Pass in the new state, without the spread operator as is not an array but a single object
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload] // Becuase we overriding an array we use the spread operator
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]; // Get the index of the item we are updating using our payload index
      const updatedIngredient = {
        ...ingredient, // Get old ingrent state in an immutable way
        ...action.payload.ingredient // spread through values and update them in that object
      };
      const ingredients = [...state.ingredients] // Get our old ingredients array in an immutable way

      // Set the index at our payload index position into our updated ingredient
      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: ingredients
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    default:
      // default will just return the current state
      return state;
  }
  // We need to return the new state of our application, reducers update our state by setting a new state
  // Returning state in this case makes ngrx update the current state with the new one even if they are equal
}
