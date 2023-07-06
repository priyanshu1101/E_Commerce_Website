import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERRORS, NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../../../constants/productConstants';
import Sidebar from '../Sidebar/Sidebar';
import Metadata from '../../../../MetaData';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { createProduct, getProductDetails, updateProduct } from '../../../../actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import './NewProduct.css';

const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'Smartphone',
];

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
    const params = useParams();

    const updateProductId = params.id;

    const { error, success } = useSelector(state => state.productFunctions);
    const { product } = useSelector(state => state.productDetails)

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            if (updateProductId !== undefined) {
                alert.success('Product updated successfully!!');
                dispatch({ type: UPDATE_PRODUCT_RESET });
            }
            else {
                alert.success('Product added successfully!!');
                dispatch({ type: NEW_PRODUCT_RESET });
            }
            Navigate('/admin/dashboard')
        }
        (updateProductId !== undefined) && dispatch(getProductDetails(updateProductId));
    }, [alert, error, success, dispatch, Navigate, updateProductId]);


    useEffect(() => {
        setName(updateProductId === undefined ? "" : product.name);
        setPrice(updateProductId === undefined ? "" : product.price);
        setDescription(updateProductId === undefined ? "" : product.description);
        setCategory(updateProductId === undefined ? "" : product.category);
        setStock(updateProductId === undefined ? "" : product.Stock);
        setPreviewImages([]);
        setImages([]);
        updateProductId && product.images && product.images.forEach(image => {
            setPreviewImages((oldPreviewImages) => [...oldPreviewImages, image.url])
            setImages((oldImages) => [...oldImages, image.url])
        })
    }, [product, updateProductId])


    const handleImageClear = () => {
        setPreviewImages([]);
        setImages([]);
    }

    const handleDeleteImage = (url) => {
        setImages(() => images.filter(image => image !== url))
        setPreviewImages(() => previewImages.filter(image => image !== url))
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previewURLs = files.map((file) => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...previewURLs]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === FileReader.DONE) {
                    setImages((prevImages) => [...prevImages, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", stock);
        images.forEach(image => {
            myForm.append("images", image);
        })
        if (updateProductId !== undefined) {
            dispatch(updateProduct(updateProductId, myForm));
        }
        else {
            dispatch(createProduct(myForm));
        }
    };

    return (
        <>
            <Metadata title="Create Product -- Admin" />
            <div className="dashboard">
                <Sidebar />
                <div className='newProductMainContainer'>
                    <div className="newProductContainer">
                        <Card className="newProductCard">
                            <CardContent>
                                <h1 className="createProductHeading">{updateProductId ? "Update" : "Create"} Product</h1>
                                <form onSubmit={handleSubmit} className="newProductForm">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Name"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Price"
                                                variant="outlined"
                                                type="number"
                                                required
                                                fullWidth
                                                value={price}
                                                onChange={e => setPrice(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Product Description"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                multiline
                                                rows={5}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl variant="outlined" required fullWidth>
                                                <InputLabel>Product Category</InputLabel>
                                                <Select
                                                    value={category}
                                                    onChange={e => setCategory(e.target.value)}
                                                    label="Product Category"
                                                >
                                                    {categories.map(category => (
                                                        <MenuItem key={category} value={category}>
                                                            {category}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Product Stock"
                                                variant="outlined"
                                                type="number"
                                                required
                                                fullWidth
                                                value={stock}
                                                onChange={e => setStock(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="uploadButtonContainer">
                                                <label htmlFor="upload-image" className="uploadButton">
                                                    <AddPhotoAlternate />
                                                    Upload Images
                                                </label>
                                                <input
                                                    accept="image/*"
                                                    id="upload-image"
                                                    type="file"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="clear-image" className="clearButton">
                                                    <ClearIcon />
                                                    Clear Images
                                                </label>
                                                <Button
                                                    id="clear-image"
                                                    onClick={handleImageClear}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                            <div className="imagePreviewContainer">
                                                {previewImages.map((url, index) => (
                                                    <div className="imageContainer" key={index}>
                                                        <div className="imageOverlay">
                                                            <div className="deleteButton" onClick={() => handleDeleteImage(url)}>
                                                                <ClearIcon />
                                                            </div>
                                                        </div>
                                                        <img
                                                            src={url}
                                                            alt={`Preview ${index}`}
                                                            className="imagePreview"
                                                        />
                                                    </div>
                                                ))}
                                            </div>


                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                                {updateProductId ? "Update" : "Create"} Product
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
