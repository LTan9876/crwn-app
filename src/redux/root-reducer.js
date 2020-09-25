import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import { persistReducer } from 'redux-persist'
//tell redux persist to use local storage as default storage
import storage from 'redux-persist/lib/storage'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

//configs for redux-persist to use
const persistReducer = {
  //where to start storage
  key: 'root',
  storage,
  //array containing string names of reducers we want to store
  //only storing cart reducer because user reducer is being handled by firebase
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})


export default persistReducer(persistConfig, rootReducer)