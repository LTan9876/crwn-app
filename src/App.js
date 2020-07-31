import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { Route, Switch } from 'react-router-dom'
import { auth } from './firebase/firebase.utils'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    //method in firebase auth library
    //open msg system between app and firebase, sends msg if user has updated
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
    })
  }

  componentWillUnmount() {
    //close open connection to prevent memory leaks
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path = '/' component = {HomePage} />
          <Route exact path = '/shop' component = {ShopPage} />
          <Route exact path = '/signin' component = {SignInAndSignOutPage} />
        </Switch>
      </div>
    )
  }
}

export default App;
