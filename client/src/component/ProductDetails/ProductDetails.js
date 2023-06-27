import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { useAlert } from 'react-alert';
import { Grid, Input } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import { Audio } from 'react-loader-spinner';
import MetaData from '../../MetaData';
import ReviewCard from './ReviewCard/ReviewCard';
import './ProductDetails.css'
import { CLEAR_ERRORS } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = () => {
  const { product, error, loading } = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS })
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, error, params.id, alert]);

  const decreaseQuantity = () => {
    if (quantity > 1)
      setQuantity(quantity - 1);
  }
  const increaseQuantity = () => {
    if (quantity < product.Stock)
      setQuantity(quantity + 1);
    else
      alert.show(`Oops !! , Only ${product.Stock} left in stock :(`)
  }
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, quantity));
    alert.success("Items added to cart !!");
  }

  const options = {
    edit: false,
    color2: '#ffa41c',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    value: product?.ratings
  };

  return (
    (loading === undefined || loading) ?
      <div className="loader">
        <Audio color="#5953bc" height={150} width={150} />
      </div>
      :
      <Fragment>
        <MetaData title={`${product.name} -- EasyShop.in`} />
        <div className='ProductContainer'>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div className='CarouselContainer'>
                <Carousel>
                  {product?.images &&
                    product?.images.map((item, i) => (
                      <div key={item._id}>
                        <img
                          className='CarouselImage'
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className='ProductInfo'>
                <div className='detailsBlock-1'>
                  <h2>{product?.name}</h2>
                  <p>Product # {product?._id}</p>
                </div>
                <div className='detailsBlock-2'>
                  <ReactStars {...options} />
                  <a href="#reviewSection" style={{ textDecoration: 'none' }}>
                    <span>({product?.numOfReviews} Reviews)</span>
                  </a>
                </div>
                <div className='detailsBlock-3'>
                  <h1>₹ {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</h1>
                  <div className='detailsBlock-3-1'>
                    <div className='detailsBlock-3-1-1'>
                      <button onClick={decreaseQuantity}>-</button>
                      <Input value={quantity} type='number' />
                      <span> </span>
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button className='AddToCartButton' onClick={addToCartHandler}>Add to Cart</button>
                  </div>
                  <br />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Status:</h3>
                    <b className={product?.Stock < 1 ? 'redColor' : 'greenColor'} style={{ marginLeft: '10px' }}>
                      {product?.Stock < 1 ? 'Out of Stock' : 'In Stock'}
                    </b>
                  </div>
                </div>
                <div className='detailsBlock-4'>
                  <div><h3>Description:</h3> {product?.description}</div>
                </div>
                <br />
                <button className='submitReview'>Submit Review</button>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="reviewSection" id="reviewSection">
          <h3 className="reviewsHeading">Customer Reviews</h3>
          <hr />
          <div className="reviewContainer">
            {product?.reviews && product?.reviews.length > 0 ? (
              <div className="reviews">
                {product?.reviews.map((review, index) => (
                  <div className="reviewCard" key={index}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="noReviews">No reviews yet. Be the first to leave a review.</p>
            )}
          </div>
        </div>



      </Fragment>
  );
};

export default ProductDetails;
