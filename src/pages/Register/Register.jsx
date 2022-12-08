import React from "react";
import { Container, Row, Col } from "reactstrap";
import * as Yup from "yup";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/Common Section/CommonSection";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import "../../assets/css/login.css";
import { useDispatch } from "react-redux";
import { signUpApi } from "../../redux/reducers/userReducer";
import { toast } from 'react-toastify'
const Register = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      gender: true,
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
        passwordConfirm: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      phone: Yup.string()
        .required("Required")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Must be a valid phone number"
        ),
    }),
    onSubmit: (values) => {
      try {
        dispatch(signUpApi(values))
        toast.success('Sign up successfully')
      } catch (error) {
        toast.error('Went something wrong')

      }
    },
  });

  return (
    <Helmet title="Register">
      <CommonSection title="Register" />
      <section>
        <Container>
          <Row>
            <Col lg="9" md="6" sm="6" className="mx-auto">
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
                      {formik.errors.email && (
                        <p className="errorMsg">{formik.errors.email}</p>
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
                      {formik.errors.password && (
                        <p className="errorMsg">{formik.errors.password}</p>
                      )}
                    </div>
                    <div className="form__group">
                      <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Password Confirm"
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.passwordConfirm && (
                        <p className="errorMsg">
                          {formik.errors.passwordConfirm}
                        </p>
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
                      {formik.errors.name && (
                        <p className="errorMsg">{formik.errors.name}</p>
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
                      {formik.errors.phone && (
                        <p className="errorMsg">{formik.errors.phone}</p>
                      )}
                    </div>
                    <div className="mt-5">
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
                  </Col>

                  <Col lg="6" className="ms-auto text-end">
                    <span className="pe-4">
                      <Link
                        className="text-muted"
                        style={{ fontSize: ".9rem" }}
                        to="/login"
                      >
                        Already have an account? Login
                      </Link>
                    </span>
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      type="submit"
                      className="addToCart__btn"
                    >
                      Sign Up
                    </motion.button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
