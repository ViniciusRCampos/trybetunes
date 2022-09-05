import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    name: '',
    image: '',
    description: '',
    email: '',
  };

  componentDidMount() {
    this.user();
  }

  user = () => {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({
        loading: false,
      }, () => {
        const { name, email, image,
          description } = userName;
        this.setState({
          name,
          image,
          description,
          email,
        });
      });
    });
  };

  // CORRIGIR FUNÇÃO VERIFY BUTTON E TESTAR DE NOVO
  // verifyButton = () => {
  //   const { name, email, description, image } = this.state;
  //   if (name !== '' && email !== '' && description !== '' && image !== '') {
  //     this.setState({ isDisabled: false });
  //   } else {
  //     this.setState({ isDisabled: true });
  //   }
  // };

  verifyButton = () => {
    const { name, email, description, image } = this.state;
    const userInfo = [name, email, description, image];
    const buttonStatus = userInfo.some((propriedade) => propriedade.length === 0);
    this.setState({ isDisabled: buttonStatus });
  };

  // updateUserName = async (user) => {
  //   await updateUser(user);
  // };

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({ [id]: value }, this.verifyButton());
  };

  handleClick = () => {
    this.setState({ loading: true }, async () => {
      const { image, description,
        name, email } = this.state;
      const update = {
        name,
        email,
        image,
        description,
      };
      await updateUser(update);
      this.setState({ loading: false, saved: true })
    });
  };

  // handleClick = () => {
  //   this.setState({ loading: true });
  //   const { name, email, description, image } = this.state;
  //   this.setState({ loading: false }, async () => {
  //     await updateUser({ name, email, description, image });
  //   }, () => {
  //     const { history } = this.props;
  //     history.push('/profile');
  //   });
  // };

  render() {
    const { loading, name, image,
      description, email, isDisabled, saved } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          <section>
            <div data-testid="page-profile-edit">
              ProfileEdit
            </div>
            <section>
              <form className="form-profile-edit">
                <img
                  src={ image }
                  alt={ name }
                  className="image-profile-edit"
                />
                <label htmlFor="image">
                  Imagem:
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    id="image"
                    className="input"
                    onChange={ this.handleChange }
                    value={ image }
                  />
                </label>
                <label htmlFor="name">
                  Nome:
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    id="name"
                    className="input"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <label htmlFor="email">
                  E-mail:
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    id="email"
                    onChange={ this.handleChange }
                    className="input"
                    value={ email }
                  />
                </label>
                <label htmlFor="description">
                  Description:
                  <textarea
                    data-testid="edit-input-description"
                    id="description"
                    onChange={ this.handleChange }
                    className="input"
                    value={ description }
                  />
                </label>
              </form>
              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ isDisabled }
              >
                salvar
              </button>
              {(saved) && (<Redirect to="/profile" />)}
            </section>
          </section>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
