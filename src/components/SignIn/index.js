import './styles.scss';
import Button from '../../components/forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils';
import { Component } from 'react';
import FormInput from './../forms/FormInput';
import AuthWrapper from '../AuthWrapper';
import { Link } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ ...initialState });
    } catch (error) {
      console.log(error);
    }
  };
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  render() {
    const configAuthWrapper = {
      headline: 'Login',
    };
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            <Button>Submit</Button>
            <div className="socialSignIn">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
            <div className="links">
              <Link to="/recovery">Reset Password</Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignIn;
