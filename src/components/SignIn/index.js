import { useState, useEffect } from "react";
import "./styles.scss";
import Button from "../../components/forms/Button";
// import { signInWithGoogle } from "./../../firebase/utils";
import FormInput from "./../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const configAuthWrapper = {
    headline: "Login",
  };

  useEffect(() => {
    if (signInSuccess) {
      dispatch(resetAllAuthForms());
      setEmail("");
      setPassword("");
      props.history.push("/");
    }
  }, [signInSuccess]);

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button>Submit</Button>
          <div className="socialSignIn">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
