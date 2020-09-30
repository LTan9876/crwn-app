import { createSelector } from 'reselect'

const selectShop = (state) => state.shop

export const selectCollections = createSelector (
    [selectShop],
    shop => shop.collections
)

//data normalization, data stored in obj vs array
//changed shop/shop.data to obj instead of array so can do instant lookup, and not use find method to loop through entire array
export const selectCollection = (collectionUrlParam) => 
    createSelector(
     [selectCollections],
     collections => collections[collectionUrlParam]
    )