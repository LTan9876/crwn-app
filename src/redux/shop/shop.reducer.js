import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
    collections: null
}

//reducer action is to only return state because we want to just be more organized 
//with data and return data without modifying it
const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state
    }
}

export default shopReducer