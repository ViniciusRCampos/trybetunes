import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <section>
          <h3 data-testid="header-user-name">
            {loading ? <Loading /> : `${username.name}` }
          </h3>
        </section>
        <section>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </section>
      </header>
    );
  }
}
