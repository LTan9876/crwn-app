import React from 'react'
import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  // always render custom button, but conditional rendering for google sign in

  <button className = {`${isGoogleSignIn ? 'google-sign-in': ''} custom-button`} {...otherProps}>
    {children}
  </button>
)

export default CustomButton
