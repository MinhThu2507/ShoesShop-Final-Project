import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Carts from '../../components/UI/Cart/Carts'
import { useSelector } from 'react-redux'
const HomeTemplate = () => {
  const { cartIsVisible } = useSelector(state => state.cartUI)
  return (
    <>
      <Header />
      {cartIsVisible && <Carts />}
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeTemplate