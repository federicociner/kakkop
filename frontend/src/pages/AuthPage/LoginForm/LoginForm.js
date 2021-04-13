import React from "react";

import {Form, Field, withFormik, ErrorMessage} from "formik";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import * as Yup from "yup";

const BaseForm = props => {
  return (
    <Form>
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <Field
          name="email"
          type="email"
          placeholder="Enter email"
          className={`form-control ${props.errors.email ? "is-invalid" : ""}`}
        />
        <ErrorMessage
          component="div"
          name="email"
          className="form-error-message"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <Field
          name="password"
          type="password"
          placeholder="Enter password"
          className={`form-control ${
            props.errors.password ? "is-invalid" : ""
          }`}
        />
        <ErrorMessage
          component="div"
          name="password"
          className="form-error-message"
        />
      </FormGroup>
      <div className="text-center">
        <Button
          disabled={props.isSubmitting || !(props.dirty && props.isValid)}
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({email: "", password: ""}),
  validationSchema: Yup.object({
    email: Yup.string()
      .email("*Invalid email address.")
      .required("*Email is a required field."),
    password: Yup.string().required("*Password is a required field."),
  }),
  handleSubmit: async (values, {props}) => {
    props.onLogin(values.email, values.password);
  },
  displayName: "LoginForm",
})(BaseForm);

BaseForm.propTypes = {
  dirty: PropTypes.bool,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
};

export default LoginForm;
