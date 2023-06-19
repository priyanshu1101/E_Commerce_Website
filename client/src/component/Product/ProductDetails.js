import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Input } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import './ProductDetails.css'

const ProductDetails = () => {
  const { product, error } = useSelector((state) => state.productDetails);
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, error, params.id]);

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true
  };
  useEffect(() => {
    setRating(product.ratings)
  }, [product.ratings]);


  return (
    <Fragment>
      <ToastContainer />
      <div className='ProductContainer'>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <div className='CarouselContainer'>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
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
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <ReactStars {...options} value={rating} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className='detailsBlock-3'>
                <h1>₹ {product.price}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button>-</button>
                    <Input value='1' type='number' />
                    <span> </span>
                    <button>+</button>
                  </div>
                  <button className='AddToCartButton'>Add to Cart</button>
                </div>
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h3>Description:</h3>
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'} style={{ marginLeft: '10px' }}>
                    {product.Stock < 1 ? 'Out of Stock' : 'In Stock'}
                  </b>
                </div>
              </div>
              <div className='detailsBlock-4'>
                <div><h3>Description:</h3> {product.description}</div>
              </div>
              <button className='submitReview'>Submit Review</button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
