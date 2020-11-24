import React, { useEffect, lazy, Suspense } from 'react';
// import './App.css';
// import HomePage from './pages/homepage/homepage.component'
// import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
// import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { checkUserSession } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect'
// import { CheckoutPage } from './pages/checkout/checkout.component'
import { GlobalStyle } from './global.styles'
import Spinner from './components/spinner/spinner.componet'
import ErrorBoundary from './components/error-boundary/error-boundary.component'


const HomePage = lazy(() => import("./pages/homepage/homepage.component"))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignOutPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

const App = ({ checkUserSession, currentUser }) => {
  // unsubscribeFromAuth = null

  // componentDidMount() {
  //   const { checkUserSession } = this.props
  //   checkUserSession()
    // const {setCurrentUser} = this.props
    //method in firebase auth library
    //open msg system between app and firebase, sends msg if user has updated
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = createUserProfileDocument(userAuth)

        //from the documentRef obj, allows to check if doc exists because of .exist property
        //can get other properties on object with .data() method, returns JSON obj of document
        // userRef.onSnapshot(snapShot => {
        //   setCurrentUser({
        //     currentUser: {
        //       id: snapShot.id,
        //       ...snapShot.data()
        //     }
        //   })
        // })

        //if userAuth is null, set currentUser to userAuth,
        //same null value
        // setCurrentUser(userAuth)
        // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
      // }

  // componentWillUnmount() {
  //   close open connection to prevent memory leaks
  //   this.unsubscribeFromAuth()
  // }

  //acts like componentDidMount
  //pass checkUserSession into dependency array to get rid of warning
  //can do this because checkUserSession is passed in as props
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

    return (
      <div>
        {/* passed in state so header component is aware if user is signed in or out */}
        <GlobalStyle />
        <Header/>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback = {<Spinner />}>
              <Route exact path = '/' component = {HomePage} />
              <Route exact path = '/shop' component = {ShopPage} />
              <Route exact path = '/signin' render = {() => currentUser ? (<Redirect to= '/' />) : (<SignInAndSignOutPage/>)} />
              <Route exact page = '/checkout' component = {CheckoutPage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    )
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
