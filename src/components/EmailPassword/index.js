import React, { Component } from 'react';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/forms/Button';
import { auth } from '../../firebase/utils';
import { withRouter } from 'react-router-dom';

const initialState = {
  email: '',
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email } = this.state;
      const config = {
        url: 'http://localhost:3000/login',
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login');
          console.log('Password reset successfully');
        })
        .catch(() => {
          const err = ['Email does not exist'];
          this.setState({ errors: err });
          console.log('Email does not exist');
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, errors } = this.state;
    const configAuthWrapper = {
      headline: 'Email password',
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
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <Button type="submit">Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
