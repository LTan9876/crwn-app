import React from 'react'
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className = 'cart-icon' onClick = {toggleCartHidden}>
    <ShoppingIcon className = 'shopping-icon'/>
    <span className = 'item-count'>{itemCount}</span>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

//selector, gets whole state but pulls off small chunk (cart, cartItem)
//always being called, becaues state is always a new object, data inside new object will be new
const mapStateToProps = ({ cart: {cartItem} }) => ({
  itemCount: cartItems.reduce((accumulatedQuantity, cartItem) =>
   accumulatedQuantity + cartItem.quantity, 0)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
