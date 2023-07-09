import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../../actions/cartAction';
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import MetaData from '../../../MetaData';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { useAlert } from 'react-alert';
import './ShippingPage.css';

const ShippingPage = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const shipping = useSelector((state) => state.cart);
    const shippingData = shipping.shippingInfo || {
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        phoneNo: '',
    };

    const ValidateData = () => {
        if ((!postcodeValidatorExistsForCountry(country) || (postcodeValidatorExistsForCountry(country) && postcodeValidator(pincode, country) === false))) {
            alert.error("Invalid Pincode !!");
            return false;
        }
        else if (phoneNo.toString().length < 10) {
            alert.error("Invalid Phone Number !!");
            return false
        }
        return true;
    }

    const [shippingInfo, setShippingInfo] = useState(shippingData);

    const { address, country, state, city, pincode, phoneNo } = shippingInfo;

    const [countries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ValidateData()) {
            dispatch(saveShippingInfo(shippingInfo));
            navigate('/order/confirm')
        }
    }

    useEffect(() => {
        const fetchStates = () => {
            const states = State.getAllStates().filter(
                (state) => state.countryCode === country
            );
            setStates(states);
        };
        fetchStates();
    }, [country]);

    const handleCountryChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            country: e.target.value,
            state: '',
        });
    };

    const handleStateChange = (e) => {
        setShippingInfo({ ...shippingInfo, state: e.target.value });
    };
    return (
        <>
            <MetaData title="Shipping Details" />
            <div className='shipping-page'>
                <CheckoutSteps activeStep={0} />
                <div className="shipping-container">
                    <div className="card-container">
                        <div className="card">
                            <form onSubmit={handleSubmit}>
                                <h2>Shipping Details</h2>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        required
                                        onChange={(e) =>
                                            setShippingInfo({ ...shippingInfo, address: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        required
                                        value={city}
                                        onChange={(e) =>
                                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pincode">Pincode</label>
                                    <input
                                        type="number"
                                        id="pincode"
                                        required
                                        value={pincode}
                                        onChange={(e) =>
                                            setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNo">Phone Number</label>
                                    <input
                                        type="number"
                                        id="phoneNo"
                                        minLength={10}
                                        required
                                        value={phoneNo}
                                        onChange={(e) =>
                                            setShippingInfo({ ...shippingInfo, phoneNo: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <select id="country" value={country} onChange={handleCountryChange}>
                                        {countries.map((country) => (
                                            <option key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </option>
                                        ))}
                                        required
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <select id="state" value={state} onChange={handleStateChange}>
                                        {states.map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button className="pay-button">Confirm Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingPage;
