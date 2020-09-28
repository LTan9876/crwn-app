import { createSelector } from 'reselect'

//collection id param in shop component is passing in a numeric id
//numeric id will be used in COLLECTION_ID_MAP to pass in collection item string
//selector is selectCollection
const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const selectShop = (state) => state.shop

export const selectCollections = createSelector (
    [selectShop],
    shop => shop.collections
)

export const selectCollection = (collectionUrlParam) => 
    createSelector(
     [selectCollections],
     collections => collections.find(
         collection => collection.id ===COLLECTION_ID_MAP[collectionUrlParam]
     )
    )