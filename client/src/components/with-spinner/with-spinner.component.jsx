import React from 'react'
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'

//higher order func, takes in wrapped component
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        //if loading, render spinner
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        //if not loading, render component
        <WrappedComponent {...otherProps}/>
    )
}

export default WithSpinner