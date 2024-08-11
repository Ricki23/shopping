import React from "react";
import './DescriptionBox.css';
const DescriptionBox = () =>
{
    return(
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews</div>
            </div>
            <div className="descriptionbox-description">
                <p>An ecommerce website is a digital platform that enables the buying and selling of goods and services over the internet. 
                It features a user-friendly interface, detailed product listings with images and descriptions, and a shopping cart for easy purchase management. 
                Secure payment gateways process transactions, while order management systems track purchases from placement to delivery. 
                Customers can create accounts for personalized experiences and faster checkouts. 
                The website also includes search functionality, robust security measures to protect user data, mobile compatibility for on-the-go access, 
                and customer support options to assist with any issues or queries. 
                This comprehensive setup ensures a seamless and secure online shopping experience for users</p>
                
                <p>Ecommerce involves the buying and selling of goods and services online, 
                encompassing activities such as online shopping, electronic payments, order processing, 
                and inventory management. It also includes customer service, digital marketing, 
                data analytics, logistics, and handling returns and refunds. 
                Security measures are crucial to protect transactions and customer data</p>
            </div>
        </div>
    )
}
export default DescriptionBox