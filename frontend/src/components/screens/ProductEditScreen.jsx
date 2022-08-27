import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../Message"
import Loader from "../Loader"
import FormContainer from '../FormContainer'
import { listProductsDetails, UpdateProduct } from "../../actions/productActions"
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditScreen = () => {
  const [ name, setName ] = useState("")
  const [ price, setPrice ] = useState(0)
  const [ image, setImage] = useState("")
  const [ brand, setBrand] = useState("")
  const [ category, setCategory] = useState("")
  const [ countInStock, setCountInStock] = useState(0)
  const [ description, setDescription] = useState("")
  const [ uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const productId = params.id
  
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate 
} = productUpdate

  useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate("/admin/productlist")
        } else{

            if(!product.name || product._id !== productId) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.bran)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [product, dispatch, productId, navigate, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/upload", formData, config)
            
            setImage(data)
            setUploading(false)

        } catch(error) {
            console.log(error)
            setUploading(false)
        }
    }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(UpdateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
    }))
  }

  return (
    <>
      <Link to="/admin/productlist" className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control 
            type='name' 
            placeholder='Enter name' 
            value={name} 
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>
       
        <Form.Group className='py-3' controlId='price'>
        <Form.Label>Price</Form.Label>
        <Form.Control 
            type='number' 
            placeholder='price' 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
       
        <Form.Group className='py-3' controlId='image'>
        <Form.Label>Image</Form.Label>
        <Form.Control 
            type='text' 
            placeholder='Enter image url' 
            value={image} 
            onChange={(e) => setImage(e.target.value)} />
        <Form.Control 
            type="file"
            label="Choose file"
            custom
            onChange={uploadFileHandler}/>
            {uploading && <Loader />}
        </Form.Group>

        <Form.Group className='py-3' controlId='brand'>
        <Form.Label>Brand</Form.Label>
        <Form.Control 
            type='text' 
            placeholder='Enter brand' 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)} />
        </Form.Group>

        <Form.Group className='py-3' controlId='countInStock'>
        <Form.Label>CountInStock</Form.Label>
        <Form.Control 
            type='number' 
            placeholder='Enter countInStock' 
            value={countInStock} 
            onChange={(e) => setCountInStock(e.target.value)} />
        </Form.Group>

        <Form.Group className='py-3' controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Control 
            type='text' 
            placeholder='Enter category' 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>

        <Form.Group className='py-3' controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control 
            type='text' 
            placeholder='Enter description' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
       
        <Button type='submit' variant='primary'>
            Update
        </Button>
        </Form>
      )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen