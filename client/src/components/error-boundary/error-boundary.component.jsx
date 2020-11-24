import React from 'react'

class ErrorBoundary extends React.Component {
    constructor() {
        super()

        this.state = {
            hasErrored: false
        }
    }

    //catches error from children components
    static getDerivedStateFromError(error) {
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    render() {
        if(this.state.hasErrored) {
            return <div> There is an error </div>
        }
        return this.props.children 
    }
}

export default ErrorBoundary