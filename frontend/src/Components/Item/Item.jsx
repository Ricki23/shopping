import React from 'react'
import {Link} from 'react-router-dom';
import './Item.css'
import Product from '../../Pages/Product'
import Breadcrum from '../Breadcrums/Breadcrum';
const Item = (props) =>
{
    return(
        <div className='item'>
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link>
            <p>{props.name}</p>
            <div className='item-prices'>
                <div className='item-price-new'>
                    Rs{props.new_price}
                </div>
                <div className='item-price-old'>
                    <p>Rs{props.old_price}</p>
                </div>
            </div>
        </div>
    )
}

export default Item