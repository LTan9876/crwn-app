import { takeLatest, call, put } from 'redux-saga/effects'
import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

//sagas want to run concurrently without blocking each other
export function* fetchCollectionsAsync() {
    //put is the saga effect for creating actions
    //put can act like dispatch, have to use it with yield keyword
    try {
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put (fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     updateCollections(collectionsMap)
        //   }).catch(error => dispatch(fetchCollectionsFailure(error.message)))

}

//pauses when action types are in
//second param is another generator, runs in response to takeEvery listener (first param)
export function* fetchCollectionsStart() {
    //takeEvery listens for every event passed into it
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync)
}