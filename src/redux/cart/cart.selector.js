//can create memoized selector to reduce cost of re-rendering
import { createSelector } from 'reselect'

//pulls one piece from state, input selector
const selectCart = (state) => state.cart

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItem
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector (
    [selectCartItems],
    cartItems => cartItems.reduce((accumlatedQuantity, cartItem) => accumlatedQuantity + cartItem.quantity, 0)
)