import { all, call } from 'redux-saga/effects'
import { shopSagas } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

export default function* rootSaga() {
    //all takes array of sagas, allows sagas to run concurrently
     yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
     ])
}