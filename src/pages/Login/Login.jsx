import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/Common Section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
// css
import "../../assets/css/login.css";
import { loginApi, loginFacebook } from "../../redux/reducers/userReducer";
const Login = () => {
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    if(response?.accessToken){
      dispatch(loginFacebook(response.accessToken))
    }
    console.log(response);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginApi(values));
    },
  });

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" className="m-auto text-center">
              <form
                className="form mb-5"
                action=""
                onSubmit={formik.handleSubmit}
              >
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && (
                    <p
                      className="errorMsg text-start"
                      style={{ fontSize: ".9rem" }}
                    >
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && (
                    <p
                      className="errorMsg text-start"
                      style={{ fontSize: ".9rem" }}
                    >
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="form__btn d-flex align-items-center justify-content-between">
                  <button className=" addToCart__btn">Login</button>
                  <div
                 
                  >
                    <FacebookLogin
                      appId="1203285676939981"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      cssClass="btn-primary addToCart__btn d-flex align-items-center justify-content-between 
                                      gap-2"
                      icon="ri-facebook-circle-fill"
                    />
                  </div>
                </div>
              </form>
              <div>
                <Link
                  className="text-muted"
                  style={{ fontSize: ".9rem" }}
                  to="/register"
                >
                  Already have an account? Create an account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
