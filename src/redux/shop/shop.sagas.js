import { takeEvery } from 'redux-saga/effects'
import ShopActionTypes from './shop.types'

//sagas want to run concurrently without blocking each other
export function* fetchCollectionsAsync() {
    yield console.log('!')
}

//pauses when action types are in
//second param is another generator, runs in response to takeEvery listener (first param)
export function* fetchCollectionsStart() {
    //take every listens for every event passed into it
    //creates non blocking call
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync)
}