import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection.component'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import { fetchCollectionsStart, fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  // unsubscribeFromSnapshot = null

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStart()

    // const { updateCollections } = this.props
    // const collectionRef = firestore.collection('collections')

    //using URL given by firestore 
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db/databases/(default)/documents/collections')
    // .then(response => response.json())

    //converted to promise, will only get new data when component mounts
    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({loading:false})
    // })

    //stream style of getting data
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({loading:false})
    // })
  }

  render() {
    const { match, isCollectionFetching } = this.props
    return (
    <div className = 'shop-page'>
    {/* match is from history, want to display path current on */}
    {/* passes in destructured loading so can decide which view to render */}
    <Route exact path = {`${match.path}`} 
    render = {(props) => <CollectionsOverviewWithSpinner isLoading = {isCollectionFetching} {...props}/>} />
    {/* putting in the collection ID as a param in path */}
    <Route path = {`${match.path}/:collectionId`} 
    render = {(props) => <CollectionPageWithSpinner isLoading = {isCollectionFetching} {...props}/>}/>
  </div>
    )
  }
}   

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)




