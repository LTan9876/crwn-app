import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
// import { signInWithGoogle, auth } from '../../firebase/firebase.utils'
import './sign-in.styles.scss'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     email: '',
  //     password: ''
  //   }
  // }

  const [ userCredentials, setCredentials ] = useState({ email: '', password: ''})

  const handleChange = (event) => {
    const { value, name} = event.target

    setCredentials({ ...userCredentials, [name] : value})
  }

  const { email, password } = userCredentials
  const handleSubmit = async (event) => {
    event.preventDefault()
    // const { emailSignInStart } = this.props

    emailSignInStart(email, password)

    // try {
    //   await auth.signInWithEmailAndPassword(email, password)

    //   this.setState({
    //     email: '',
    //     password:''
    //   })
    // } 
    // catch (error) {
    //   console.error(error)
    // }
  }


    return (
      <div className = 'sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit = {handleSubmit}>


          <FormInput
          name = 'email'
          type = 'email'
          onChange = {handleChange}
          value = {email}
          label = 'email'
          required/>



          <FormInput
          name = 'password'
          type= 'password'
          onChange = {handleChange}
          value = {password}
          label = 'password'
          required/>

          <div className = 'buttons'>
          <CustomButton type = 'submit'>
            Sign In
          </CustomButton>
          <CustomButton type = 'button' 
          onClick = {googleSignInStart} 
          isGoogleSignIn>
            Sign In With Google
          </CustomButton>
          </div>
        </form>
      </div>
    )
  }


const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)
