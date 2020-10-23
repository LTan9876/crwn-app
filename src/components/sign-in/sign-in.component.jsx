import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signInWithGoogle, auth } from '../../firebase/firebase.utils'
import './sign-in.styles.scss'
import { googleSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { value, name} = event.target

    this.setState({ [name] : value})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)

      this.setState({
        email: '',
        password:''
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { googleSignInStart } = this.props
    return (
      <div className = 'sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit = {this.handleSubmit}>


          <FormInput
          name = 'email'
          type = 'email'
          onChange = {this.handleChange}
          value = {this.state.email}
          label = 'email'
          required/>



          <FormInput
          name = 'password'
          type= 'password'
          onChange = {this.handleChange}
          value = {this.state.password}
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
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn)
