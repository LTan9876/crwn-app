import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyD3z3qFzlQ54DUWk8JuVmZB0iY9F6H4jXI",
  authDomain: "crwn-db-38b37.firebaseapp.com",
  databaseURL: "https://crwn-db-38b37.firebaseio.com",
  projectId: "crwn-db-38b37",
  storageBucket: "crwn-db-38b37.appspot.com",
  messagingSenderId: "908873493939",
  appId: "1:908873493939:web:f78f45b653cb16973c2fc6",
  measurementId: "G-30FZQRQR57"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
