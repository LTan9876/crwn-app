import React from 'react'
import './checkout-item.styles.scss'
import { connect } from 'react-redux'
import { clearItemFromCart } from '../../redux/cart/cart.actions'

const CheckoutItem = ({ cartItem, clearItem }) => {
    // destructuring here so map dispatch has access to cart item
    const { name, imageUrl, price, quantity} = cartItem
    return (
    <div className = 'checkoutItem'>
        <div className = 'image-container'>
            {/* for accessiblity, put in alt */}
            <img scr = {imageUrl} alt = 'item' />
        </div>
        <span className = 'name'>{name}</span>
        <span className = 'quantity'>{quantity}</span>
        <span className = 'price'>{price}</span>
            {/* remove button is a wing ding */}
        <div className = 'remove-button' onClick = {() => clearItem(cartItem)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps = (dispatch) => ({
    clearItem: item => dispatch(clearItemFromCart(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)