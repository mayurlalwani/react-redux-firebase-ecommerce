import React, { useState } from "react";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../../components/forms/FormInput";
import Button from "../../components/forms/Button";
import { auth } from "../../firebase/utils";
import { withRouter } from "react-router-dom";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
          console.log("Password reset successfully");
        })
        .catch(() => {
          const err = ["Email does not exist"];
          setErrors(err);
          console.log("Email does not exist");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const configAuthWrapper = {
    headline: "Email password",
  };
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
