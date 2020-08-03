import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'

const Header = ({ currentUser }) => (
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

    </div>
  </div>
)

export default Header
