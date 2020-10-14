import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//public key so firebase knows to look for this project
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  //fires batch commits, returns a promise
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
}

firebase.initializeApp(config)

//methods provided by firebase
export const auth = firebase.auth()
export const firestore = firebase.firestore()

//use google as auth of choice
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

//pop up window lets user choose which account to sign in as
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
