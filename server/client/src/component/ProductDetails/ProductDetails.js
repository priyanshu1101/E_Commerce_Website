import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, productReview } from '../../actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import { Button, Grid, Input, Modal } from '@mui/material';
import { Rating } from '@mui/material';
import { Audio } from 'react-loader-spinner';
import { useAlert } from 'react-alert';
import ReviewCard from './ReviewCard/ReviewCard';
import { GiShoppingCart } from 'react-icons/gi';
import { CLEAR_ERRORS, NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import './ProductDetails.css';
import MetaData from '../../MetaData';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, error, loading } = useSelector((state) => state.productDetails);
  const { user, loading: userLoading } = useSelector(state => state.user);
  const { success, error: reviewError } = useSelector(state => state.newReview);
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);
    dispatch(productReview(myForm));
    setOpenModal(false)
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS })

      if (error === "Product not found")
        navigate('/products')
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch({ type: CLEAR_ERRORS })
    }
    if (success) {
      alert.success("Review Submitted Successfully!!")
      dispatch({ type: NEW_REVIEW_RESET })
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, error, params.id, alert, success, reviewError, navigate]);

  useEffect(() => {
    const userRating = (user && product && product.reviews && product.reviews.length > 0)
      ? product.reviews.find(review => review.user._id === user._id)
      : { rating: '', comment: '' };
    setRating(userRating ? userRating.rating || '' : '');
    setComment(userRating ? userRating.comment || '' : '');

  }, [user, product]);

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
    (loading === undefined || loading || userLoading === undefined || userLoading) ?
      <div className="loader">
        <Audio color="#5953bc" height={150} width={150} />
      </div>
      :
      <Fragment>
        <MetaData title={`${product.name} -- Easy Shop`} />
        <div className={openModal && "modal-container"}>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div className="modal-container">
              <h2>Order Review</h2>
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={handleRatingChange}
                      size="large"
                      precision={0.5}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Write your review..."
                      value={comment}
                      onChange={handleReviewChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Modal>
        </div>
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
                  <h2 style={{ textAlign: 'left' }}>{product?.name}</h2>
                  <p>Product # {product?._id}</p>
                </div>
                <div className='detailsBlock-2'>
                  <ReactStars {...options} />
                  <a href="#reviewSection" style={{ textDecoration: 'none' }}>
                    <span>({product?.numOfReviews} Reviews)</span>
                  </a>
                </div>
                <div className='detailsBlock-3'>
                  <h1>Rs. {product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-</h1>
                  <div className={`detailsBlock-3-1 ${product?.Stock < 1 ? "out-of-stock" : "in-stock"}`}>
                    <div className='detailsBlock-3-1-1'>
                      <button onClick={decreaseQuantity}>-</button>
                      <Input value={quantity} type='number' readOnly />
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
                <button className='submitReview' onClick={handleOpenModal}>Submit Review</button>
                <br />
                <button className='viewCart' onClick={() => { navigate('/cart') }}>Go to Cart <GiShoppingCart style={{ marginLeft: '10px' }} size={25} /></button>
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



      </Fragment >
  );
};

export default ProductDetails;