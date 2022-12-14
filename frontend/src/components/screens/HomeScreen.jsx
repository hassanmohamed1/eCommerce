import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap"
import Product from '../Product'
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
import ProductCarousel from '../ProductCarousel'
import { listProducts } from '../../actions/productActions'

const HomeScreen = () => {
  const { keyword, } = useParams()

  const { pageNumber } = useParams() || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])


  return (
    <>
    { !keyword && <ProductCarousel /> }
    <h1>Latest Product</h1>
    {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
        <>
        <Row>
        {products.map(product => (
            <Col className='align-items-stretch d-flex' key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
    </Row>
    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
    }
    </>
  )
}

export default HomeScreen
