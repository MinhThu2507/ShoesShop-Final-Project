// library
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// components
import CommonSection from "../../components/UI/Common Section/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
// css
import "../../assets/css/cart-page.css";
//redux
import { deleteItem } from "../../redux/reducers/productReducer";
import { setOrderDetailApi } from "../../redux/reducers/userReducer";
import { getStoreJson, USER_LOGIN } from "../../util/config";

const Cart = () => {
  const dispatch = useDispatch();
  const { totalAmount, productCart, totalQuantity } = useSelector(
    (state) => state.products
  );
  const [cartProduct, setCartProduct] = useState(productCart);

  // lấy ra dữ liệu người dùng từ localStorage
  const getUserLogin = getStoreJson(USER_LOGIN)?.email;
  // Lấy ra id và quantity để đưa vào order API
  const product = cartProduct.map((product) => {
    const orderDetail = {
      productId: String(product.id),
      quantity: Number(product.quantity),
    };

    return orderDetail;
  });
  // xử lý checkout
  const handleCheckout = (e) => {
    const orderDetail = {
      orderDetail: product,
      email: getUserLogin,
    };
    dispatch(setOrderDetailApi(orderDetail));
    totalQuantity = 0;
    toast.success("Checkout completed successfully");
  };

  // useEffect(() => {
  //   setCartProduct(productCart)
  // }, [productCart])

  return (
    <Helmet title="Cart">
      <CommonSection title={"Your Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              <table className="table ">
                <thead>
                  <tr className="text-center">
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // Render Item
                    productCart.length === 0 ? (
                      <tr>
                        <td>
                          <h5 className="text-center mt-4">
                            No products added to cart
                          </h5>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {productCart.map((item, index) => {
                          return <Tr item={item} key={index} />;
                        })}
                      </>
                    )
                  }
                </tbody>
              </table>
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="small-desc mt-3">
                Taxes and shipping will calculate in checkout
              </p>
              <div className="cart__page-btn">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn w-100"
                >
                  <Link to="/products">Continue Shopping</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn w-100 mt-3"
                >
                  <Link to={"/home"} onClick={handleCheckout}>
                    Checkout
                  </Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;

const Tr = ({ item }) => {
  const { id, image, name, price, quantity } = item;
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(id));
  };
  return (
    <tr className="text-center">
      <td className="cart__img-box">
        <img src={image} alt="" />
      </td>
      <td>{name}</td>
      <td>${price}</td>
      <td>{quantity}</td>
      <td className="cart__item-del">
        <span onClick={handleDeleteItem}>
          <i className="ri-delete-bin-line"></i>
        </span>
      </td>
    </tr>
  );
};
