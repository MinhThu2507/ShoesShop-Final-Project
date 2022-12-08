import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
//component
import Helmet from "../../components/Helmet/Helmet";
//css
import "../../assets/css/profile.css";
import { getStoreJson, PROFILE, USER_LOGIN } from "../../util/config";
import { updateProfile } from "../../redux/reducers/userReducer";

const Profile = () => {
  const disatch = useDispatch();
  
  const getProfile = getStoreJson(PROFILE)
  const { getProfileUser } = useSelector(state => state.user)

  const [tab, setTab] = useState("his");

  const [profile, setProfile] = useState(getProfile);

  // Khi mà profileApi thay đổi re-render page và update store
  useEffect(() => {
  setProfile(getProfile)
  }, [getProfileUser]);

  const emailLocalStore = getStoreJson(USER_LOGIN)?.email;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      try {
        if (values.email === emailLocalStore) {
          disatch(updateProfile(values));
          toast.success('Update profile successfully');

        } else {
          toast.fail('Update profile fail');

        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Helmet title={"Profile"}>
      <section>
        <Container>
          <Row>
            <Col lg="3">
              {profile?.image ? (
                <img src={profile?.image} alt="" className="w-50" />
              ) : (
                <img src="./avatar.png" alt="" className="w-50" />
              )}
            </Col>
            <Col lg="9" className="mb-3">
              <form action="" onSubmit={formik.handleSubmit}>
                <Row>
                  <Col lg="6">
                    <div className="form__group">
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email ?? (
                        <p className="text-danger">{formik.errors.email}</p>
                      )}
                    </div>
                    <div className="form__group">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.phone ?? (
                        <p className="text-danger">{formik.errors.phone}</p>
                      )}
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form__group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.name ?? (
                        <p className="text-danger">{formik.errors.name}</p>
                      )}
                    </div>
                    <div className="form__group">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password ?? (
                        <p className="text-danger">{formik.errors.password}</p>
                      )}
                    </div>
                  </Col>
                  <Col lg="6" className="ms-auto ">
                    <div className="d-flex align-items-center justify-content-between ">
                      <div>
                        <div className="form-check form-check-inline">
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox1"
                          >
                            Gender:{" "}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            defaultValue="true"
                            onChange={formik.handleChange}
                            defaultChecked
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            onChange={formik.handleChange}
                            defaultValue="false"
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                      </div>

                      <div>
                        <motion.button whileTap={{scale: 1.2}} type="submit" className="addToCart__btn">
                          Update
                        </motion.button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col lg="12" className="mt-5">
              <div className="tabs d-flex align-items-center gap-5 py-2">
                <h6
                  onClick={() => setTab("his")}
                  className={`${tab === "his" ? "tab__active" : ""}`}
                >
                  Order history
                </h6>
                <h6
                  className={`${tab === "fav" ? "tab__active" : ""}`}
                  onClick={() => setTab("fav")}
                >
                  Favourite
                </h6>
              </div>
              <div className="tab__content">
                {/* // xử lý tab qua lại giữ desc và review  */}
                {tab === "his" ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr className="text-center">
                          <th>Image</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile?.ordersHistory
                          ?.slice(-3)
                          .map((order, index) => {
                            return (
                              <Fragment key={index}>
                                <tr>
                                  <td colSpan={12} className="order__date">
                                    <span>Order date:</span>{" "}
                                    {moment(order.date).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </td>
                                </tr>
                                <Tr item={order} />
                              </Fragment>
                            );
                          })}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p>Favorite</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;

const Tr = ({ item }) => {
  return (
    <>
      {item.orderDetail.map((detail, index) => {
        const { name, price, image, quantity } = detail;
        return (
          <tr className="text-center profile__detail" key={index}>
            <td className="cart__img">
              <img src={image} alt="" />
            </td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>${price}</td>
          </tr>
        );
      })}
    </>
  );
};
