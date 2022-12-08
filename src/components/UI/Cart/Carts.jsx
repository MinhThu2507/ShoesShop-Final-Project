import React from 'react'
import {ListGroup } from 'reactstrap'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import '../../../assets/css/shopping-cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUI } from '../../../redux/reducers/cardUIReducer'

const Carts = () => {
  const dispatch = useDispatch()
  const { productCart, totalAmount } = useSelector(state => state.products)
  const handleToggleCart = () => {
    dispatch(toggleUI())
  }
  return (
    <div className="cart__container">
      <ListGroup className='cart'>
          <div className="cart__close" onClick={handleToggleCart}>
            <span>
              <i className='ri-close-fill'></i>
            </span>
          </div>
          <div className="cart__item-list">
            {
                productCart.length === 0 ? <h5 className='text-center mt-5'>
                  No item added to cart</h5> : productCart.map((product, index) => {
                    return (
                      <CartItem product={product} key={index}/>
                    )
                  })
            }

          </div>
          <div className="cart__bottom">
            <h6>Subtotal amount: <span>${totalAmount}</span></h6>
            <button>
              <Link to='/cart' onClick={handleToggleCart}>Checkout</Link>
            </button>
          </div>
      </ListGroup>
    </div>
  )
}

export default Carts