import { all, call } from 'redux-saga/effects'
import { fetchCollectionsStart } from './shop/shop.sagas'

export default function* rootSaga() {
    //all takes array of sagas, allows sagas to run concurrently
     yield all([
        call(fetchCollectionsStart)
     ])
}