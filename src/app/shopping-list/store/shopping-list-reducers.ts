import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

/**
 * On start up when the first action is dispatched there is no current state to compare it to and replace so we need to set an inital state
 */
const initalState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
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
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    default:
      // default will just return the current state
      return state;
  }
  // We need to return the new state of our application, reducers update our state by setting a new state
  // Returning state in this case makes ngrx update the current state with the new one even if they are equal
}
