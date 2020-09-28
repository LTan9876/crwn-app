import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection.component'

const ShopPage = ({ match }) => (
      <div className = 'shop-page'>
        {/* match is from history, want to display path current on */}
        <Route exact path = {`${match.path}`} component = {CollectionsOverview} />
        {/* putting in the collection ID as a param in path */}
        <Route path = {`${match.path}/:collectionId`} component = {CollectionPage}/>
      </div>
)

export default ShopPage




