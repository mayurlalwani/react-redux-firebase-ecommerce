import React, { Component } from 'react';
import Signup from '../../components/Signup';

import './styles.scss';

class Registration extends Component {
  render() {
    return (
      <div>
        <h1>Registration page</h1>
        <Signup />
      </div>
    );
  }
}

export default Registration;
