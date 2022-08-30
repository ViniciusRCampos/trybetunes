import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    username: '',
    loading: '',
  };

  componentDidMount() {
    this.user();
  }

  user = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      username: user,
      loading: false,
    });
  };

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          {loading ? <Loading /> : `${username.name}` }
        </h3>
      </header>
    );
  }
}
