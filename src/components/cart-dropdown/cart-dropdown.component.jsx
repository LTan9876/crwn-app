import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component'
import {connect} from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selector'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'

const CartDropdown = (cartItems, history) => (
  <div className = 'cart-dropdown'>
    <div className = 'cart-items'>
      {
        cartItem.length ?
        cartItems.map(cartItem => (
        <CartItem key ={cartItem.id} item={cartItem}/>)) :
          (<span className = 'empty-message'>Your cart is empty</span>)
      }
      <CustomButton onClick = {() => history.push('/checkout')}>
        Go To Checkout
      </CustomButton>
    </div>
  </div>
)

//createStrucutedSelector is useful is mult selectors will be used
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

//order matters, evaluates from inside out
export default withRouter(connect(mapStateToProps)(CartDropdown))
