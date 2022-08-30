import React from 'react';
// import PropType from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    submit: false,
    isButtonDisabled: true,
    loading: false,

  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value }, () => this.buttonStatus());
  };

  handleClick = () => {
    const { name } = this.state;
    this.setState({ submit: true, loading: true }, async () => {
      await createUser({ name });
      this.setState({ loading: false });
    });
  };

  buttonStatus = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) this.setState({ isButtonDisabled: false });
  };

  render() {
    const { isButtonDisabled, loading, submit } = this.state;

    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form htmlFor="login-name-input">
          <input
            type="text"
            data-testid="login-name-input"
            name="login-name-input"
            placeholder="Login"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ isButtonDisabled }
          >
            Submit
          </button>
        </form>
        {
          loading && (
            <Loading />
          )
        }
        {
          (!loading && submit) && (<Redirect to="/search" />)
        }
      </div>
    );
  }
}

export default Login;
