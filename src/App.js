import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect'
import { CheckoutPage } from './pages/checkout/checkout.component'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    //method in firebase auth library
    //open msg system between app and firebase, sends msg if user has updated
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth)

        //from the documentRef obj, allows to check if doc exists because of .exist property
        //can get other properties on object with .data() method, returns JSON obj of document
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      //if userAuth is null, set currentUser to userAuth,
      //same null value
      setCurrentUser(userAuth)
      addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
    })
  }

  componentWillUnmount() {
    //close open connection to prevent memory leaks
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        {/* passed in state so header component is aware if user is signed in or out */}
        <Header/>
        <Switch>
          <Route exact path = '/' component = {HomePage} />
          <Route exact path = '/shop' component = {ShopPage} />
          <Route exact path = '/signin' render = {() => this.props.currentUser ? (<Redirect to= '/' />) : (<SignInAndSignOutPage/>)} />
          <Route exact page = '/checkout' component = {CheckoutPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
