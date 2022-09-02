import React from 'react';
import { Redirect } from 'react-router-dom';
// import PropType from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    profileName: '',
    profileImage: '',
    profileDescription: '',
    profileEmail: '',
    isDisabled: true,
    saved: false,
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
          profileName: name,
          profileImage: image,
          profileDescription: description,
          profileEmail: email,
        });
      });
    });
  };

  // CORRIGIR FUNÇÃO VERIFY BUTTON E TESTAR DE NOVO
  verifyButton = () => {
    const {
      profileName,
      profileImage,
      profileEmail,
      profileDescription,
    } = this.state;
    if (profileName && profileDescription
        && profileImage && profileEmail) {
      this.setState({ isDisabled: false });
    }
    this.setState({ isDisabled: true });
  };

  //   updateUserName = async (user) => {
  //     await updateUser(user);
  //   };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.verifyButton());
  };

  handleClick = () => {
    const { profileImage, profileDescription,
      profileName, profileEmail } = this.state;
    const update = {
      name: profileName,
      image: profileImage,
      description: profileDescription,
      email: profileEmail,
    };
    this.setState({ saved: true }, async () => {
      await updateUser(update);
    });
  };

  render() {
    const { loading, profileName, profileImage,
      profileDescription, profileEmail, isDisabled,
      saved } = this.state;
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
                  src={ profileImage }
                  alt={ profileName }
                  className="image-profile-edit"
                  onChange={ this.handleChange }
                  name={ profileImage }
                />
                <label htmlFor="editName">
                  Image:
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="profileImage"
                    id="editImage"
                    className="input"
                    onChange={ this.handleChange }
                    value={ profileImage }
                  />
                </label>
                <label htmlFor="editName">
                  Nome:
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="profileName"
                    id="editName"
                    className="input"
                    onChange={ this.handleChange }
                    value={ profileName }
                  />
                </label>
                <label htmlFor="editEmail">
                  Email:
                  <input
                    data-testid="edit-input-email"
                    type="text"
                    name="profileEmail"
                    id="editEmail"
                    onChange={ this.handleChange }
                    className="input"
                    value={ profileEmail }
                  />
                </label>
                <label htmlFor="editDescription">
                  Description:
                  <textarea
                    data-testid="edit-input-description"
                    name="profileDescription"
                    id="editDescription"
                    onChange={ this.handleChange }
                    className="input"
                    value={ profileDescription }
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

export default ProfileEdit;
