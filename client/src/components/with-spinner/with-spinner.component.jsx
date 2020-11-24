import React from 'react'
import Spinner from '../spinner/spinner.componet'

//higher order func, takes in wrapped component
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        //if loading, render spinner
        <Spinner />
    ) : (
        //if not loading, render component
        <WrappedComponent {...otherProps}/>
    )
}

export default WithSpinner