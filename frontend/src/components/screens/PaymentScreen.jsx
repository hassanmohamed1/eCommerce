import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from '../FormContainer'
import CheckoutSteps from '../CheckoutSteps'
import { savePaymentMethod } from '../../actions/ cartActions'

const PaymentScreen = () => {
    const cart = useSelector( state => state.cart )
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if(!shippingAddress) {
        navigate("/shipping")
    }

    const [ payment, setPayment ] = useState("Paypal")


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(payment))
        navigate("/placeorder")
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='py-3'>
            <Form.Label as="legend">Select Method</Form.Label>
        <Col>
            <Form.Check 
            type='radio' 
            label="PayPal or Credit Card" 
            id='PayPal' 
            name='paymentMethod' 
            value="PayPal" 
            checked 
            onChange={(e) => setPayment(e.target.value)}></Form.Check>
        </Col>

        </Form.Group>
        <Button type='submit' variant='primary'>
            Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
