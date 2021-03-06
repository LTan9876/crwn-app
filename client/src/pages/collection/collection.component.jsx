import React, { useEffect } from 'react'
import './collection.styles.scss'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selectors'
import { connect } from 'react-redux'
import { firestore } from '../../firebase/firebase.utils'

const CollectionPage = ({ collection }) => {
    // useEffect(() => {
    //     const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(async snapshot => console.log(snapshot))
    //     return () => {
    //         unsubscribeFromCollections()
    //     }
    // }, [])

    const { title, items } = collection
    return (
    <div className = 'collection-page'>
        <h2 className = 'title'>{title}</h2>
        <div className = 'items'>
            {items.map(item => 
                (<CollectionItem key = {item.id} item = {item}/>))}
        </div>
    </div>
)}

//ownProps is props of component
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)