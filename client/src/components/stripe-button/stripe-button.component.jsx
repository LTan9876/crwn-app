import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
    //stripe handles price in cents, have to mult by 100
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_p1yoM0E3AcYRO8cqCHxdTWpw007ViX8ykR'

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('payment error', JSON.parse(error))
            alert('Payment failure')
        })
    }

    return (
        //normally, token takes care of payment on backend, but because there is actually no money being processed, takes function that logs amount spent
        <StripeCheckout 
            label = 'Pay Now'
            name = 'Test'
            billingAddress
            shippingAddress
            image = 'https://sendeyo.com/up/d/f3eb2117da'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLable = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton