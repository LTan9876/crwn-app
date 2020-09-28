import React from 'react'
import './collection.styles.scss'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selectors'
import { connect } from 'react-redux'

const CollectionPage = ({ match }) => (
    <div className = 'collection-page'>
        <h2>Collection PAGE</h2>
    </div>
)

//ownProps is props of component
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)