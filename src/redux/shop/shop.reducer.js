import SHOP_DATA from './shop.data'

const INITIAL_STATE = {
    collections: SHOP_DATA
}

//reducer action is to only return state because we want to just be more organized 
//with data and return data without modifying it
const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default shopReducer