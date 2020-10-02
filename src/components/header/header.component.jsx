import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { createStructureSelector } from 'reselect'
import { selectCartHidden } from '../../redux/cart/cart.selector'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer} from './header.styles'

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to = '/'>
      <Logo className = 'logo'/>
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to = '/shop'> Shop</OptionLink>
      <OptionLink to = '/shop'> Contact</OptionLink>
      {/* ternary to decide to render sign in or sign out */}
      {/* sign out is taken care of by firebase */}
      {
        currentUser ?
        <OptionDiv onClick = {() => auth.signOut()}>Sign Out</OptionDiv>
        :
        <OptionLink to = '/signin'> Sign In</OptionLink>
      }
      <CartIcon/>
    </OptionsContainer>
    {
      hidden ? null : <CartDropdown/>
    }
  </HeaderContainer>
)


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
