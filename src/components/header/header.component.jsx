import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

const Header = ({ currentUser, hidden }) => (
  <div className = 'header'>
    <Link className = 'logo-container' to = '/'>
      <Logo className = 'logo'/>
    </Link>
    <div className = 'options'>
      <Link className = 'option' to = '/shop'> Shop</Link>
      <Link className = 'option' to = '/shop'> Contact</Link>
      {/* ternary to decide to render sign in or sign out */}
      {/* sign out is taken care of by firebase */}
      {
        currentUser ?
        <div className = 'option' onClick = {() => auth.signOut()}>Sign Out</div>
        :
        <Link className = 'option' to = '/signin'> Sign In</Link>
      }
      <CartIcon/>
    </div>
    {
      hidden ? null : <CartDropdown/>
    }
  </div>
)

//nested destructuring, example state.user.currentUser
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header)
