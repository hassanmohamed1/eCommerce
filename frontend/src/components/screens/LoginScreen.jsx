import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../Message"
import Loader from "../Loader"
import FormContainer from '../FormContainer'
import { login } from "../../actions/userActions"

const LoginScreen = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const dispatch = useDispatch()
  const { search } = useLocation()
  const navigate = useNavigate()
  
  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type='email' 
          placeholder='Enter email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='py-3' controlId='password'>
          <Form.Label>password</Form.Label>
          <Form.Control 
          type='password' 
          placeholder='Enter password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
        
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
