import React from 'react';
// import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.user();
  }

  user = () => {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({
        userName,
        loading: false,
      });
    });
  };

  render() {
    const { userName, loading } = this.state;
    const { name, email, image,
      description } = userName;
    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          <section>
            <div data-testid="page-profile">
              Profile
            </div>
            <section>
              <div>
                <img
                  src={ image }
                  alt={ name }
                  className="profile-picture"
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <div>
                <h3>Nome:</h3>
                <p>{name}</p>
              </div>
              <div>
                <h3>E-mail:</h3>
                <p>{email}</p>
              </div>
              <div>
                <h3>Descrição</h3>
                <p>{description}</p>
              </div>
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
