import React from 'react'
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

class SignUp extends React.Component {
  constructor() {
    super()

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async(event) => {
    event.preventDefault()

    const { displayName, email, password, confirmPassword } = this.state

    if(password !== confirmPassword) {
      alert('password does not match')
      return
    }

    try {
      //creates new user account associated with specific email and password
      //made with email and password info from state
      //returns new user obj
      const { user } = await auth.createUserWithEmailAndPassword(email, password)

      //pass new user obj into creatUserProfileDoc to put into firebase
      //displayName destructured because is an obj, destructuring pulls out value
      await createUserProfileDocument(user, { displayName })

      //resets to empty form
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch(error) {
      console.error(error)
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target

    //square brackets set object's name
    this.setState({
      [name] : value
    })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return(
      <div className = 'sign-up'>
        <h2 className = 'title'>I do not have an account</h2>
        <span>Sign up with your email and passowrd</span>
        <form className = 'sign-up form' onSubmit = {this.handleSubmit}>
          <FormInput
            type = 'text'
            name = 'displayName'
            value = { displayName }
            onChange = { this.handleChange }
            label = 'DisplayName'
            required
          />
          <FormInput
            type = 'email'
            name = 'email'
            value = { email }
            onChange = { this.handleChange }
            label = 'Email'
            required
          />
          <FormInput
            type = 'password'
            name = 'password'
            value = { password }
            onChange = { this.handleChange }
            label = 'Password'
            required
          />
          <FormInput
            type = 'password'
            name = 'confirmPassword'
            value = { confirmPassword }
            onChange = { this.handleChange }
            label = 'Confirm Password'
            required
          />
          <CustomButton type = 'submit'>Sign Up</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignUp
