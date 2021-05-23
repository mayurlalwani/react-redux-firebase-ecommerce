import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/forms/Button";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPassword,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const EmailPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  const configAuthWrapper = {
    headline: "Email password",
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());

      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => {
              return <li key={index}> {error} </li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
