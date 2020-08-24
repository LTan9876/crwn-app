import React from 'react'
import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted,...otherProps }) => (
  // always render custom button, but conditional rendering for google sign in

  <button className = {`${inverted ? 'inverted': ''} custom-button`} {...otherProps}>
    {children}
  </button>
)

export default CustomButton
