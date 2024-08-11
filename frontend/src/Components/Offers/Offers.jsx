import React from "react";
import "./Offers.css";
import exclusive_image from '../Assets/exclusive_image.png';
const Offers = () =>
{
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>EXCLUSIVE OFFERS</h1>
                <h1>For you </h1>
                <p>ONLY ON THE BEST SELLERS PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt=""/>
            </div>
        </div>
    )
}

export default Offers