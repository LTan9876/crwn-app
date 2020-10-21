import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'
import { compose } from 'redux'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

//compose is currying functions, evaluates right to left 
//same as if written "connect(mapStateToProps)(WithSpinner(CollectionsOverview))"
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer